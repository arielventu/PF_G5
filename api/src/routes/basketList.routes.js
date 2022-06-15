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
  deleteBasketListItem,
} = require("../controllers/basketList.controllers.js");

// C.R.U.D.
router.get("/basketList/:user", getBasketListByUser);
router.post("/basketList", postBasketList);
router.put("/basketList/:id", putBasketList);
router.delete("/basketList/:id", deleteBasketListItem);
module.exports = router;
