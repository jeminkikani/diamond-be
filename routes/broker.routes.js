const express = require("express");
const { addBroker, getBrokers, updateBroker, deleteBroker } = require("../controllers/broker.controller");

const brokerRouter = express.Router();

// Define the routes and associate them with controller methods
brokerRouter.post("/add-broker", addBroker);              // Create a new broker
brokerRouter.get("/get-brokers/:id?", getBrokers);        // `:id?` makes the `id` optional
brokerRouter.put("/update-brokers/:id", updateBroker);    // Update a broker by ID
brokerRouter.delete("/delete-brokers/:id", deleteBroker); // Soft delete a broker


module.exports = brokerRouter;

