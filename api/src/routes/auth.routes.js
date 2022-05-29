var express = require('express');
var router = express.Router();
const guard = require('express-jwt-permissions');
var guardingFunc = guard();

router.get('/auth', guardingFunc.check(["read:products"]), function (req, res){
    res.json({
        product1: "prod1"
    })
});

module.exports = router;