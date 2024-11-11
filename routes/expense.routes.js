const express = require("express");
const {
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
} = require("../controllers/expense.controller");

const expenseRouter = express.Router();

// Define the routes and associate them with controller methods
expenseRouter.post("/add-expense", addExpense);
expenseRouter.get("/get-expense/:id?", getExpenses);
expenseRouter.put("/update-expense/:id", updateExpense);
expenseRouter.delete("/delete-expense/:id", deleteExpense);

module.exports = expenseRouter;
