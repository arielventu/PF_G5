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
  getAllStock,
  getStock,
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/stock.controllers.js");

// crud
router.get("/stock", getAllStock);
router.post("/stock", createStock);
router.put("/stock/:id", updateStock);
router.delete("/stock/:id", deleteStock);
router.get("/stock/:id", getStock);

module.exports = router;
