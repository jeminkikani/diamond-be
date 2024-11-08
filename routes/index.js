const express = require("express");
const brokerRouter = require("./broker.routes");
const diamondRouter = require("./diamond.routes");
const loginRouter = require("./login.routes");
const { verifytoken } = require("../middleware/auth");

const router = express.Router();

router.use("/broker", brokerRouter);
router.use("/daimond", diamondRouter);
router.use("/user", loginRouter);

module.exports = router;
