var express = require('express');
var router = express.Router();

//import controllers
const {
    getReviews,
    postReviews,
} = require('../controllers/reviews.controllers');

// get all reviews
router.get('/reviews', getReviews);

// post a review
router.post('/reviews', postReviews);

module.exports = router;