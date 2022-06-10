var express = require('express');
var router = express.Router();

//import controllers
const {
    postOrder,
} = require('../controllers/checkout.controllers');


router.post('/checkout/postOrder', postOrder);
// router.post('/colors', postColors);

module.exports = router;