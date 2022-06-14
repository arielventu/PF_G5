import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { completeCheckoutOrder, getApiJWT, ShopCar } from '../actions/actions'
import Card from './Card'
import styles from './CheckoutHandler.module.css';
import { useDispatch } from 'react-redux';

const CheckoutHandler = () => {

    const { status } = useParams();
    console.log(status)
    
    const [ completedOrder, setCompletedOrder ] = useState(null);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { getAccessTokenSilently } = useAuth0();
    const navegation = useNavigate();
    const dispatch = useDispatch();

    // Necesario para la obtencion del API token en el BACK.
    const getToken = () => {
        return new Promise((resolve, reject) => {
          getAccessTokenSilently()
            .then(async token => getApiJWT(token))
            .then(apiToken => {
              resolve(apiToken);
              console.log(apiToken)
            })
            .catch(error => {
              reject(error)
            })
        })
      };
  
    // Son los parametros que vienen por URL Query desde la api de MP, no es necesario obtenerlos todos por el momento
    let mpCheckoutCompleted = {
        preference_id: searchParams.get("preference_id"),
        external_reference: searchParams.get("external_reference"),
        payment_id: searchParams.get("payment_id"),
        merchant_order_id: searchParams.get("merchant_order_id"),
        processing_mode: searchParams.get("processing_mode"),
        merchant_account_id: searchParams.get("merchant_account_id")
    }
    // console.log(mpCheckoutCompleted);

    let orderId = mpCheckoutCompleted.external_reference;
        
    useEffect(() => {
        getToken()
        .then( apiToken => completeCheckoutOrder( orderId, apiToken ))
        .then( order => {
            setCompletedOrder(order);
            localStorage.setItem('carrito', JSON.stringify([]));
            dispatch(ShopCar( JSON.parse(localStorage.getItem('carrito'))))
        })
        .catch( err => console.log(err) )
    },[])
        
    const continueShopping = () => {
        navegation('/Shop');
    };
    

    return (
        // <>
        //     Preference ID: {mpCheckoutCompleted.preference_id} <br /><br />
        //     ID de la orden creada: {mpCheckoutCompleted.external_reference} <br />
        //     - CON ESTE ID DE ORDEN ENVIAMOS CONSULTA AL BACK PARA TRAER LOS DATOS DE LA ORDEN Y MOSTRAR ALGO..<br /><br />
        
        //     ID de pago: {mpCheckoutCompleted.payment_id} <br /><br /><br />
        // </>
        <div className={styles.mainContainer}>
            <h1 className={styles.title}> THANKS FOR BUYING </h1>
            { completedOrder !== null ? (
                    <>
                        <div className={styles.cardsContainer}>
                            {completedOrder.data.orderdetails.map( orderdetail => {
                                return (
                                    <Card 
                                        key={orderdetail.product.id} 
                                        id={orderdetail.product.id} 
                                        fullName={orderdetail.product.fullName} 
                                        price={orderdetail.product.price} 
                                        img={orderdetail.product.imagecover}
                                    />
                                )
                            })}
                        </div>
                        <div className={styles.divTotal}>
                            <h2 className={styles.total}>Total: ${completedOrder.data.amount}</h2>
                        </div>
                        <button className={`${styles.contShopBtn} ${styles.medium}`} onClick={ () => continueShopping() }> CONTINUE SHOPPING </button>
                    </>
                ) :
                (
                    <>
                        LOADING
                    </>
                )}
        </div>

    )
}

export default CheckoutHandler