/* --------------------------------------------
  file: products.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

var express = require("express");
var router = express.Router();
const { Product, Review } = require("../db.js");

// import controllers
const {
  getProducts,
  createProduct,
} = require("../controllers/products.controllers.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// routes list
router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products");
router.delete("/products/:id");
router.get("/products/:id");

module.exports = router;
