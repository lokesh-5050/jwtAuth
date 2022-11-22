var express = require("express");
var router = express.Router();
const {homePage} = require("../controllers/indexControllers")
const { createUser, login } = require("../controllers/userControllers");
const {authenticateLogin} = require("../middlewares/auth")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Api for userCreation
router.post("/createUser" , createUser);

//Api for userLogin
router.post("/userLogin", authenticateLogin  ,login)

//Api for a homepage
router.get("/homepage" , homePage)


module.exports = router;
