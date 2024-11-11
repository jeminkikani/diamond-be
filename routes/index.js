const express = require("express");
const brokerRouter = require("./broker.routes");
const diamondRouter = require("./diamond.routes");
const loginRouter = require("./login.routes");
const { verifytoken } = require("../middleware/auth");
const expenseRouter = require("./expense.routes");

const router = express.Router();

router.use("/broker", brokerRouter);
router.use("/daimond", diamondRouter);
router.use("/expense", expenseRouter)
router.use("/user", loginRouter);

module.exports = router;
