/* --------------------------------------------
  file: orders.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

var express = require("express");
var router = express.Router();

// import controllers
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/customers.controllers.js");

// C.R.U.D.
router.get("/orders", getOrders); // get orders
router.post("/orders", createOrder); // create order
router.put("/orders/:id", updateOrder); // update order by id
router.delete("/orders/:id", deleteOrder); // delete order by id
router.get("/orders/:id", getOrder); // get order by id
module.exports = router;
