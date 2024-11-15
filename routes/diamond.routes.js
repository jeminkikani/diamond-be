const express = require("express");
const {
    addDiamond,
    getAllDiamonds,
    updateDiamond,
    deleteDiamond,
    getTotalPaymentsAndBrokerage,
} = require("../controllers/diamond.controller");

const diamondRouter = express.Router();

// Define the routes and associate them with controller methods
diamondRouter.post("/add-diamond", addDiamond);
diamondRouter.get("/get-diamond/:id?", getAllDiamonds);
diamondRouter.put("/update-diamond/:id", updateDiamond);
diamondRouter.delete("/delete-diamond/:id", deleteDiamond);

module.exports = diamondRouter;
