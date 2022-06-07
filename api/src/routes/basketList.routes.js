/* --------------------------------------------
  file: basketList.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTdime: 2022-06-06 22:20:00 
-----------------------------------------------*/

var express = require("express");
var router = express.Router();

// import controllers
const {
  getBasketListByUser,
  postBasketList,
  putBasketList,
  deleteBasketList,
} = require("../controllers/basketList.controllers.js");

// C.R.U.D.
router.get("/basketList/:user", getBasketListByUser); // get all basketList by user
router.post("/basketList", postBasketList);
router.put("/basketList/:id", putBasketList);
router.delete("/basketList/:id", deleteBasketList);
module.exports = router;
