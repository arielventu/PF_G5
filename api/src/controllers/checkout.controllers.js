const mercadopago = require('mercadopago');
const { MP_ACCESS_TOKEN } = process.env;
const { Customers, Orders, Orderdetails, Product } = require('../db');
const axios = require('axios')

const postOrder = async (req, res) => {
    
    // Configuramos una instancia de la herramienta de mercadopago con el access token de la aplicacion CheckoutPro creada
    mercadopago.configure({
        access_token: `${MP_ACCESS_TOKEN}`
    });
    
    const { 
        userId,
        userMail,
        userFullName,
        purchaseItems,
        totalPrice,
        billingAddress,
        shippingAddress,
        country,
        phone
    } = req.body;
    // console.log(req.body)

    let options = {
        method: 'GET',
        url: `http://localhost:3001/users/roles/${userId}`,
        headers: {
            authorization: req.headers.authorization,
            "content-type": "application/json"
        }
    };

    Promise.all([
        Customers.findByPk(userId),
        axios.request(options)
    ])
    .then( responses => {
        // console.log('>>>>> CUSTOMER: ')
        // console.log(responses[0])
        // console.log('>>>>> ROLES REQUEST: ')
        // console.log(responses[1].data)
        
        let adminArr = responses[1].data.filter( role => role.name === 'Admin' );
        let userType = adminArr.length > 0 ? 'admin' : 'user';

        if( !responses[0] ) {
            return Customers.create({
                id: userId,
                fullName: userFullName,
                billingAddress,
                defaultShippingAddress: shippingAddress,
                country,
                phone,
                userType: userType
            });
        }
        else {
            return Customers.findByPk(userId)
        }

    })
    .then( customer => {
        // Luego creamos la nueva orden y le asociamos el customer ID creado en el paso anterior
        // console.log(customer)
        return Orders.create({
            amount: totalPrice,
            shippingAddress: shippingAddress,
            orderEmail: userMail,
            orderDate: String(new Date()),
            orderStatus: 'created'
        })
        .then( order => order.setCustomer(customer.id) )
    })
    .then( orderUpdated => {
        // console.log(orderUpdated);
        // console.log(purchaseItems)
        let details = purchaseItems.map( detail => {
            return Orderdetails.create({
                price: detail.price,
                quantity: detail.quantity,
                productId: detail.productId
            })
            .then( detail => detail.setOrder(orderUpdated.id) )
        })
        return Promise.all(details)
    })
    .then( orderDetails => {
        // console.log(orderDetails);
        // Buscamos los nombres de los productos
        let productsIds = purchaseItems.map( item => {
            return Product.findByPk(item.productId)
        })
        return Promise.all(productsIds)
    })
    .then( products => {
        // console.log(products);
        // Seteamos la moneda
        let currency = '';
        // console.log(country)
        if ( country === 'ARG' ) currency = 'ARS';
        if ( country === 'COL' ) currency = 'COP';
        if ( country === 'EEUU' ) currency = 'USD';
        // etc...
        
        let newPurchaseItems = purchaseItems.map( item => {
            let prod = products.filter( product => product.id === item.productId )
            return {
                title: prod[0].fullName,
                quantity: item.quantity,
                currency_id: currency,
                unit_price: item.price,
                //   notification_url: 'endpoint a crear en back, se recibira la notificacion del pago realizado',
                //   external_reference: 'id de la orden que se creó',
                //   back_urls: 'url de front end para mostrar que el pago fue exitoso o no'
            }
        })

        console.log(newPurchaseItems)
        
        let preference = {
            items: newPurchaseItems
        }
        
        return mercadopago.preferences.create(preference)
    })
    .then( createdPref => res.json(createdPref.response.id) )
    .catch( function (error) {
        console.error(error);
        res.send(error)
    });
   
}

module.exports = {
    postOrder,
};    




