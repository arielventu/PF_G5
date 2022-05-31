/* --------------------------------------------
  file: customers.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

var express = require("express");
var router = express.Router();

// import controllers
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers.controllers.js");

// C.R.U.D.
router.get("/customers", getCustomers); // get customers
router.post("/customers", createCustomer); // create cuestomer
router.put("/customers/:id", updateCustomer); // update customer by id
router.delete("/customers/:id", deleteCustomer); // delete customer by id
router.get("/customers/:id", getCustomer); // get customer by id
module.exports = router;
