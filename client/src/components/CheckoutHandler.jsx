import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { completeCheckoutOrder, getApiJWT, ShopCar, discountStock } from '../actions/actions'
import Card from './Card'
import styles from './CheckoutHandler.module.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import loadingNavInfo from "../image/loadingNavInfo.gif"

const CheckoutHandler =  () => {

    let inicio = true;

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
    
    const initiate = () => {
        getToken()
        .then( apiToken => completeCheckoutOrder( orderId, apiToken ))
        .then( order => {
            console.log(order)
            setCompletedOrder(order);
            localStorage.setItem('carrito', JSON.stringify([]));
            dispatch(ShopCar( JSON.parse(localStorage.getItem('carrito'))))
            return axios.post('/sendemail', {
                amount: order.data.amount,
                shippingAddress: order.data.shippingAddress,
                orderEmail: order.data.orderEmail,
                orderDate: order.data.orderDate,
                orderStatus: order.data.orderStatus,
                // image: order.data.orderdetails[0].product.imagecover,
                customer: order.data.customer,
                orderdetails: order.data.orderdetails
            });
        })
        .then( mailRes => console.log(mailRes) )
        .catch( err => console.log(err) )
    }

    useEffect(() => {
        initiate();
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
                    // <>
                    //     LOADING
                    // </>
                    // <div className={styles.loadingInfo}>
                    // <img src={loadingNavInfo} id={styles.imgLoading}/>
                    <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" id={styles.imgLoading}/>
                    // </div>
                )}
        </div>

    )
}

export default CheckoutHandler