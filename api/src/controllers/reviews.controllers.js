const { Review } = require("../db");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ messge: error.messge });
  }
};

// GET REVIEW BY PRODUCT ID
const getReviewByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.findAll({ where: { productId: id } });
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const postReviews = async (req, res) => {
  const { username, description, starsLevel, productId } = req.body;
  console.log(description);
  try {
    const reviewCreated = await Review.create({
      username: username,
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
  getReviewByProductId,
};
