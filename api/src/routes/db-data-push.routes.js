var express = require('express');
var router = express.Router();

//import controllers
const { postDBData } = require('../controllers/db-data-push.controllers');

// POST initial data to Dab
router.get('/pushdbdata', postDBData);

module.exports = router;