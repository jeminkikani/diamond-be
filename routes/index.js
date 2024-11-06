const express = require("express");
const brokerRouter = require("./broker.routes");
const diamondRouter = require("./diamond.routes");

const router = express.Router();

router.use("/broker", brokerRouter);
router.use("/daimond", diamondRouter);

module.exports = router;
