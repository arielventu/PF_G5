/* --------------------------------------------
  file: products.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

var express = require("express");
var router = express.Router();

// import controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductavailable,
} = require("../controllers/products.controllers.js");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// C.R.U.D.
router.get("/products", getProducts); // get all products
router.post("/products", createProduct);
router.put("/products", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProduct); // get product by id
router.put("/products/available", updateProductavailable);
module.exports = router;
