// import Construction from './Construction'
import React, { useState, useEffect } from 'react'   
import { useAuth0 } from '@auth0/auth0-react'
import { postCheckoutOrder, getApiJWT } from '../actions/actions'
// import styles from './CheckoutTest.module.css';
import styles from './Checkout.module.css';
import { firstWordBye } from '../utils';
import { Link } from 'react-router-dom';



const Checkout = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [preferenceId, setpreferenceId] = useState('')
  const FORM_ID = 'checkoutForm';

  const lStorage = JSON.parse(localStorage.getItem('carrito'));
  const totalOrder = lStorage.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  const [newOrder, setNewOrder] = useState({
        userId: '',
        userMail: '',
        purchaseItems: [],
        totalPrice: '',
        billingAddress: '',
        shippingAddress: '',
        country: '',
        phone: ''
      })

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

  // console.log(user.name);

  const products = lStorage.map(item => {
        return {
          productId: item.id,
          quantity: item.cantidad,
          price: item.price
        }
      })
  
  const handleChange = (e) => {
    e.preventDefault();
    const { defaultValue, name, value } = e.target;
    // console.log(e.target)
    setNewOrder({
      ...newOrder,
      userId: `${user?.sub}`,
      userMail: `${user?.email}`,
      purchaseItems: lStorage.map(item => {
        return {
          productId: item.id,
          quantity: item.cantidad,
          price: item.price
        }
      }),
      totalPrice: totalOrder,
      [name]: value,
      shippingAddress: newOrder.billingAddress,
    });
    // console.log(testOrder);
  }
  
  // console.log(user.sub)
  const sendData = (e) => {
      getToken()
          .then( apiToken => postCheckoutOrder(
              // {
              //     userId: `${user.sub}`,
              //     userMail: "mail@mail.com",
              //     purchaseItems: [
              //         { productId: 1, price: 12000, quantity: 5 }
              //     ],
              //     totalPrice: 60000,
              //     billingAddress: "Carlos Casares 3001",
              //     shippingAddress: "Carlos Casares 3001",
              //     country: "Argentina",
              //     phone: "1157351408"
              // }, 
              newOrder,
              apiToken
          ))
          .then( response => {
            console.log(response)
            setpreferenceId(response.data);
          })
          .catch( err => console.log(err) )
  };

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  // console.log(lStorage);
  
    
  return (
    <div className={styles.divCheckoutContainer}>
      <div className={styles.divCheckout}>
        <div className={styles.divCheckoutHeader}>
          <h1 className={styles.checkoutTitle}>Checkout</h1>
        </div>
        <div className={styles.divCheckoutBody}>
          {lStorage.map(item => (
            <div className={styles.container}>
              <div className={styles.divCheckoutItemImg}>
                <img className={styles.img} src={item.imagecover} alt={item.name} />
              </div>
              <div className={styles.divCheckoutItemInfo}>
                <h2 className={styles.h3CheckoutItemInfo}>{firstWordBye(item.fullName)}</h2>
                {/* <h2 className={styles.h2}>{firstWordBye(fullName)}</h2> */}
                <p className={styles.pch}>Price by unit: ${item.price}</p>
                {item.cantidad === 1 ?
                  <p className={styles.pch}>Qty: {item.cantidad} unit</p>
                  : <p className={styles.pch}>Qty: {item.cantidad} units</p>
                }
                <p className={styles.pch}>Total: ${item.price * item.cantidad}</p>
              </div>
            </div>
          ))}
          <div className={styles.divTotal}>
            <h2 className={styles.total}>Total: ${totalOrder}</h2>
          </div>
          
          <form>
            <div className={styles.divCheckoutForm}>
              <div className={styles.divCheckoutFormHeader}>
                <h2 className={styles.h2CheckoutFormHeader}>{user?.name} complete your personal data</h2>
              </div>
              <div className={styles.divCheckoutFormBody}>
                {/* <div className={styles.divInfoUser}>
                  <div className={styles.divInfoUserName}>
                    <p className={styles.pInfoUser}>Name: {user?.name}</p>
                    <p className={styles.pInfoUser}>Email: {user?.email}</p>
                  </div>
                  </div> */}
                
                <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Address</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="text"
                      name="billingAddress" 
                      value={newOrder.billingAddress}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Country</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="text"
                      name="country"
                      value={newOrder.country}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Phone</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="text"
                      name="phone" 
                      value={newOrder.phone}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Email</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="text"
                      name="userMail" 
                      defaultValue={user?.email}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Email</span>
                    <input className={styles.inputCheckoutFormBodyRow} type="text" name="email" />
                  </label>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.divCheckoutFooter}>
          {/* Solo permite enviar la info una vez. Si existe preferenceId no permite hacerlo nuevamente */}
        {preferenceId === '' ?
          <button className={styles.buttonSend} onClick={() => sendData()}> Confirm data </button>
        : <button disabled className={styles.buttonSenddis} onClick={() => sendData()}> Confirm data </button>}
      <div className={styles.divMPButton}>
          <form id={FORM_ID} method="GET">
            {preferenceId === '' && <button disabled className={styles.mpButton} > Pagar </button>} {/*boton de mercadoPago deshabilitado*/}
        </form>
      </div>
        {/* <div className={styles.divConfirm}> */}
          {/* <Link to={`/shoppingCar`}>
            <button className={styles.buttonBack}>Back to Shopping Cart</button>
          </Link> */}
        {/* </div> */}
      </div>
                
      
        {/* { preferenceId && `${preferenceId}` }<br /><br /> */}
      </div>
  )
}

export default Checkout

