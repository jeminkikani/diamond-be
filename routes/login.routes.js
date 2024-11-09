var express = require("express");
const { login_page, logout_page } = require("../controllers/login.controller");
var loginRouter = express.Router();

loginRouter.post("/login", login_page);
loginRouter.post("/logout", logout_page);


module.exports = loginRouter;
