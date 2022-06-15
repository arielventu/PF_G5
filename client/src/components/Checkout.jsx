import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { postCheckoutOrder, getApiJWT } from '../actions/actions'
import styles from './Checkout.module.css';
import { firstWordBye } from '../utils';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';




const validate = ({ billingAddress, country, userMail, phone }) => {
  const errors = {};
  // const regExNum = /^\d+$/;
  const regExMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
  if (!billingAddress) errors.address = 'Address is required';
  if (!country) errors.country = 'Country is required';
  if (!phone) errors.phone = 'Phone is required';
  if (!userMail || userMail.search(regExMail) === -1) errors.email = 'Email is required and must be a valid email address';
  
  return errors;
};


const Checkout = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [preferenceId, setpreferenceId] = useState('')
  const [errors, setErrors] = useState({});
  const [errorFlag, setErrorFlag] = useState(true);
  const FORM_ID = 'checkoutForm';

  const lStorage = JSON.parse(localStorage.getItem('carrito'));
  const totalOrder = lStorage.reduce((acc, item) => acc + item.price * (item.cantidad === undefined ? 1 : item.cantidad), 0);
  const selectedSize = lStorage.reduce((acc, item) => item.selecSize, 0);

  const [newOrder, setNewOrder] = useState({
        userId: '',
        userMail: '',
        userFullName: '',
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


  const sizeId = lStorage.map(item =>
    item.stocks.filter(stock => stock.size.size === selectedSize).map(stock => stock.sizeId)
  );
  // sizeId = new Set(sizeId);
    
  

  // console.log(JSON.parse(localStorage.getItem('carrito')));
  // console.log("selectedSize", selectedSize);
  // console.log("sizeId", sizeId[0][0])

  // const products = lStorage.map(item => {
  //       return {
  //         productId: item.id,
  //         quantity: item.cantidad,
  //         price: item.price,
  //       }
  //     })
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(e.target)
    setNewOrder({
      ...newOrder,
      userId: `${user?.sub}`,
      // userMail: `${user?.email}`,
      fullName: `${user?.name}`,
      totalPrice: totalOrder,
      shippingAddress: newOrder.billingAddress,
      purchaseItems: lStorage.map(item => {
      return {
          productId: item.id,
          quantity: item.cantidad,
          price: item.price,
          sizeId:sizeId[0][0]
        }
      }),
      [name]: value,
    });
    setErrors(validate({
      ...newOrder,
      [name]: value
    }));
    setErrorFlag(Object.keys(errors).length === 0 ? false : true);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      swal({
        // title: "Error",
        text: "Please login to continue",
        icon: "warning",
        buttons: false,
        timer: 2000,
      });
    } else {
      if (errors.address || errors.country || errors.phone || errors.email || errorFlag) {
        swal({
          title: "Error",
          text: "Please fill out all required fields",
          icon: "error",
          buttons: false,
          timer: 2000,
        });
        return;
      }
      getToken()
        .then(apiToken => {
          postCheckoutOrder(newOrder, apiToken)
            .then(res => {
              console.log(res)
              console.log(newOrder)
              setpreferenceId(res.data)
              swal({
                title: "Success",
                text: "Your order has went generated. Please proceed to payment",
                icon: "success",
                button: "Ok",
              });
            })
            .catch(err => {
              console.log(err)
              swal({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
                button: "Ok",
              });
            })
        })
        .catch(err => {
          console.log(err)
          swal({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            button: "Ok",
          });
        }
        )
    }
  }
  
  // console.log(user.sub)
  const sendData = (e) => {
      getToken()
          .then( apiToken => postCheckoutOrder( 
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
                <p className={styles.pch}>Price by unit: ${new Intl.NumberFormat("en-EN").format(item.price)}</p>
                {item.cantidad === 1 || item.cantidad === undefined?
                  <p className={styles.pch}>Qty: {item.cantidad === undefined ? item.cantidad = 1 : item.cantidad} unit</p>
                  : <p className={styles.pch}>Qty: {item.cantidad} units</p>
                }
                <p className={styles.pch}>Total: ${new Intl.NumberFormat("en-EN").format(item.price * (item.cantidad === undefined ? item.cantidad = 1 : item.cantidad))}</p>
              </div>
            </div>
          ))}
          <div className={styles.divTotal}>
            <h2 className={styles.total}>Total: ${new Intl.NumberFormat("en-EN").format(totalOrder)}</h2>
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
                    <span className={styles.spanCheckoutFormBodyRow}>Address *</span>
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
                    <span className={styles.spanCheckoutFormBodyRow}>Country *</span>
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
                    <span className={styles.spanCheckoutFormBodyRow}>Phone *</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="number"
                      name="phone" 
                      value={newOrder.phone}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={styles.divCheckoutFormBodyRow}>
                  <label className={styles.labelCheckoutFormBodyRow}>
                    <span className={styles.spanCheckoutFormBodyRow}>Email *</span>
                    <input className={styles.inputCheckoutFormBodyRow}
                      type="email"
                      placeholder="me@example.com"
                      name="userMail" 
                      // defaultValue={user?.email}
                      value={newOrder.userMail}
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
          <button className={styles.buttonSend} onClick={ handleSubmit}> Confirm data </button>
        : <button disabled className={styles.buttonSenddis}> Confirm data </button>}
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

