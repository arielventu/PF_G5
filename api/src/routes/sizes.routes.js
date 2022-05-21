var express = require('express');
var router = express.Router();

//import controllers
const {
    getSizes,
    postSizes,
} = require('../controllers/sizes.controllers');

// get all sizes
router.get('/sizes', getSizes);
router.post('/sizes', postSizes);

module.exports = router;