var express = require('express');
var router = express.Router();
const { sendEmail } = require('../controllers/mail.controllers');


router.post("/sendemail", sendEmail); // send mail

module.exports = router;