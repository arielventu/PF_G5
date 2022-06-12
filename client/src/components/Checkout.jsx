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
                      { productId: 1, price: 12000, quantity: 5 },
                      { productId: 3, price: 15000, quantity: 3 }
                  ],
                  totalPrice: 60000,
                  billingAddress: "Carlos Casares 3001",
                  shippingAddress: "Carlos Casares 3001",
                  country: "ARG",
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
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  return (
      <div className={styles.checkContainer}>
        {/* hay que poner una logica para que solo se pueda enviar la solicitud una vez */}
        <button onClick={ () => sendData() }> Enviar informacion </button><br /><br />
        {/* { preferenceId && `${preferenceId}` }<br /><br /> */}
        <form id={FORM_ID} method="GET" />
      </div>
  )
}

export default Checkout

