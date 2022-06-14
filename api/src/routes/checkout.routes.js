var express = require('express');
var router = express.Router();

//import controllers
const {
    postOrder,
    completeOrder
} = require('../controllers/checkout.controllers');


router.post('/checkout/postOrder', postOrder);
router.post('/checkout/completeOrder', completeOrder);


module.exports = router;