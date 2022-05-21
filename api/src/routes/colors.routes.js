var express = require('express');
var router = express.Router();

//import controllers
const {
    getColors,
    postColors,
} = require('../controllers/colors.controllers');

// get all sizes
router.get('/colors', getColors);
router.post('/colors', postColors);

module.exports = router;