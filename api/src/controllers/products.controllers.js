/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const { Product } = require("../models/Product.js");

const getProducts = (req, res) => {
  res.send("getting products");
};

const createProduct = async (req, res) => {
  const { id, name, fullName, gender, detail, imageURL } = req.body;
  const newProduct = await Product.create({
    id,
    name,
    fullName,
    gender,
    detail,
    imageURL,
  });
  console.log(newProduct);
  res.send("creating products");
};

module.exports = {
  getProducts,
  createProduct,
};
