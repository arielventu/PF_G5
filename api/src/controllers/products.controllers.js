/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const { send } = require("express/lib/response");
const { Product } = require("../db.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, fullName, gender, detail, imageURL } = req.body;
  const newProduct = await Product.create({
    name,
    fullName,
    gender,
    detail,
    imageURL,
  });
  res.json(newProduct);
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fullName, gender, detail, imageURL } = req.body;

    const product = await Product.findByPk(id);
    product.name = name;
    product.fullName = fullName;
    product.gender = gender;
    product.detail = detail;
    product.imageURL = imageURL;
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
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
