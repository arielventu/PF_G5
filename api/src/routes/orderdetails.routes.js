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
  getOrderDetails,
  getOrderDetail,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} = require("../controllers/orderDetails.controllers.js");

// C.R.U.D.
router.get("/orderDetails", getOrderDetails); // get orderDetails
router.post("/orderDetails", createOrderDetail); // create orderDetail
router.put("/orderDetails/:id", updateOrderDetail); // update orderDetail by id
router.delete("/orderDetails/:id", deleteOrderDetail); // delete orderDetail by id
router.get("/orderDetails/:id", getOrderDetail); // get orderDetail by id
module.exports = router;
