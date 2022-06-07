/* --------------------------------------------
  file: favorites.routes.js
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTdime: 2022-06-06 22:20:00 
-----------------------------------------------*/

var express = require("express");
var router = express.Router();

// import controllers
const {
  getFavoritesByUser,
  postFavorite,
  putFavorite,
  deleteFavorite,
} = require("../controllers/favorites.controllers.js");

// C.R.U.D.
router.get("/favorites/user/:user", getFavoritesByUser); // get all favorites by user
router.post("/favorites", postFavorite);
router.put("/favorites/:id", putFavorite);
router.delete("/favorites/:id", deleteFavorite);
module.exports = router;
