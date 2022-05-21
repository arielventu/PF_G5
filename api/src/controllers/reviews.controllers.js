const { Review } = require('../db');

const getReviews = async (req, res) => {
    const reviews = Review.findAll();
    res.json(reviews);
};

const postReviews = async (req, res) => {
    const {name} = req.body;
    console.log(name);
    try {
        const reviewCreated = await Review.create({name: name});
        res.json(reviewCreated);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getReviews,
    postReviews
}
