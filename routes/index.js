const express = require("express");
const brokerRouter = require("./broker.routes");

const router = express.Router();


router.use('/broker', brokerRouter)

module.exports = router;
