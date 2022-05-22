/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

//const { send } = require("express/lib/response");
const { Product, Review, Stock, Category } = require("../db.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Stock, Review],
    });
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [Category, Stock, Review],
    });

    if (!product)
      return res.status(404).json({ message: "Product does not exists" });

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, fullName, gender, detail, imageURL } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      fullName,
      gender,
      detail,
      imageURL,
    });

    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    product.set(req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.findAll({ where: { productId: id } });
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
};
