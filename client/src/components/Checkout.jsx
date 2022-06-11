// import Construction from './Construction'
import React, { useState, useEffect } from 'react'   
import { useAuth0 } from '@auth0/auth0-react'
import { postCheckoutOrder, getApiJWT } from '../actions/actions'
// import styles from './CheckoutTest.module.css';
import styles from './Checkout.module.css';


const Checkout = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [ preferenceId, setpreferenceId ] = useState('')
  const FORM_ID = 'checkoutForm';


  const getToken = () => {
      return new Promise( (resolve, reject) => {
        getAccessTokenSilently()
          .then( async token => getApiJWT(token) )
          .then( apiToken => {
            resolve(apiToken);
            console.log(apiToken)
          })
          .catch( error => {
            reject(error)
          })
      })
    };

  const sendData = () => {
      getToken()
          .then( apiToken => postCheckoutOrder(
              {
                  userId: `${user.sub}`,
                  userMail: "mail@mail.com",
                  purchaseItems: [
                      { productId: 1, price: 12000, quantity: 5 }
                  ],
                  totalPrice: 60000,
                  billingAddress: "Carlos Casares 3001",
                  shippingAddress: "Carlos Casares 3001",
                  country: "Argentina",
                  phone: "1157351408"
              }, 
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

  // const buttonMP = document.querySelector(".mercadopago-button")
  // if (buttonMP) {
  //   buttonMP.addEventListener("click", sendData);
  // }
  const lStorage = JSON.parse(localStorage.getItem('carrito'))
  console.log(lStorage)

  return (
    <div className={styles.divCheckoutContainer}>
      <div className={styles.divCheckout}>
        <div className={styles.divCheckoutHeader}>
          <h1 className={styles.h1CheckoutHeader}>Checkout</h1>
        </div>
        <div className={styles.divCheckoutBody}>
          <form>
         

          </form>
        </div>
      </div>
      

                
        {/* Solo permite enviar la info una vez. Si existe preferenceId no permite hacerlo nuevamente */}
      {preferenceId === '' && <button onClick={() => sendData()}> Enviar informacion </button>}
      
        {/* { preferenceId && `${preferenceId}` }<br /><br /> */}
      <form id={FORM_ID} method="GET">
        {preferenceId === '' && <button disabled className={styles.mpButton} > Pagar </button>} {/*boton de mercadoPago deshabilitado*/}
      </form>
      </div>
  )
}

export default Checkout

