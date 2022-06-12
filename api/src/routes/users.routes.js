/* --------------------------------------------
  file: users.routes.js
  create by: ivo.monzon.im@gmail.com
  github: ivocfh
  date: 02/06/2022  
-----------------------------------------------*/

var express = require("express");
var router = express.Router();
const jwtAuthz = require('express-jwt-authz');

const checkPermissions = jwtAuthz(["read:users"])

// import controllers
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  resetPass,
  getUserRoles,
  setAdmin,
  revokeAdmin
} = require("../controllers/users.controllers.js");

// crud
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get("/users/roles/:id", getUserRoles);
router.delete("/users/:id", deleteUser);
router.post("/users/resetPass/:email", resetPass);
router.put("/users/:id", updateUser);
router.post("/users/setAdmin/:id", setAdmin)
router.delete("/users/revokeAdmin/:id", revokeAdmin)


module.exports = router;