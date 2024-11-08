var express = require("express");
const { login_page } = require("../controllers/login.controller");
var loginRouter = express.Router();

loginRouter.post("/login", login_page);

module.exports = loginRouter;
