const { Review } = require("../db");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ messge: error.messge });
  }
};

const postReviews = async (req, res) => {
  const { description, starsLevel, productId } = req.body;
  console.log(description);
  try {
    const reviewCreated = await Review.create({
      description: description,
      starsLevel: starsLevel,
      productId: productId,
    });
    res.json(reviewCreated);
  } catch (error) {
    return res.status(500).json({ messge: error.messge });
  }
};

module.exports = {
  getReviews,
  postReviews,
};
