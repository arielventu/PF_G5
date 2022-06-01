var express = require('express');
var router = express.Router();

//import controllers
const {
    getReviews,
    postReviews,
    getReviewByProductId,
} = require('../controllers/reviews.controllers');

// get all reviews
router.get('/reviews', getReviews);

// post a review
router.post('/reviews', postReviews);

// get a review by product
router.get('/reviews/product/:id', getReviewByProductId);

module.exports = router;