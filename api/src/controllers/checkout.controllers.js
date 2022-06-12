const mercadopago = require('mercadopago');
const { MP_ACCESS_TOKEN } = process.env;
const { Customers } = require('../db');
const axios = require('axios')

const postOrder = async (req, res) => {
    
    // Configuramos una instancia de la herramienta de mercadopago con el access token de la aplicacion CheckoutPro creada
    mercadopago.configure({
        access_token: `${MP_ACCESS_TOKEN}`
    });
    
    const { 
        userId,
        userMail,
        purchaseItems,
        totalPrice,
        billingAddress,
        shippingAddress,
        country,
        phone
    } = req.body;

    console.log(req.body)

    let options = {
        method: 'GET',
        url: `http://localhost:3001/users/roles/${userId}`,
        headers: {
            authorization: req.headers.authorization,
            "content-type": "application/json"
        }
    };
      
    axios.request(options)
        .then( function (response) {
            console.log(response.data)
        })
        .catch( function (error) {
            console.error(error);
        });


    // DE ACA PARA ABAJO ES TODO DE TEST. FALTAN MEJORAR COSAS 
    
    // const newCustomer = await Customers.create({
    //     id: userId,
    //     billingAddress,
    //     defaultShippingAddress: shippingAddress,
    //     country,
    //     phone
    // });

    // console.log(newCustomer)




    // let currency = '';
    // if ( country === 'ARG' ) currency = 'ARS';
    // if ( country === 'EEUU' ) currenci = 'USD';
    // // etc...
    
    // let items = purchaseItems.map( item => { return { ...item, currency_id: currency } } )
// ---------------------------------------------------------------------------------------------------
    var preference = {
      items: [
        {
          title: 'Test',
          quantity: 3,
          currency_id: 'ARS',
          unit_price: 10.5,
        

        //   notification_url: 'endpoint a crear en back, se recibira la notificacion del pago realizado',
        //   external_reference: 'id de la orden que se creó',
        //   back_urls: 'url de front end para mostrar que el pago fue exitoso o no'
        
        }
      ]
    };
    
    mercadopago.preferences.create(preference)
        .then( createdPref => res.json(createdPref.response.id) )
}

module.exports = {
    postOrder,
};
