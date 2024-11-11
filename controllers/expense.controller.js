const expenseModel = require("../models/expense.model");

// Create a new Expense
const addExpense = async (req, res) => {
    try {
        const { purchase_Date, description, amount } = req.body;

        const newExpense = new expenseModel({
            purchase_Date,
            description,
            amount,
        });

        const savedExpense = await newExpense.save();
        return res.status(201).json({
            status: "success",
            message: "Expense added successfully.",
            data: savedExpense,
        });
    } catch (error) {
        console.error("Error in Expense controller", error);
        return res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Get Expense (all or by ID)
const getExpenses = async (req, res) => {
    try {
        const expenseId = req.params.id;

        if (expenseId) {
            // Fetch specific Expense by ID
            const Expense = await expenseModel.findById(expenseId);
            if (!Expense || Expense.is_deleted) {
                return res.status(404).json({
                    status: "Fail",
                    message: "Expense not found",
                });
            }
            return res.status(200).json({
                status: "success",
                data: Expense,
            });
        } else {
            // Fetch all expenses
            const expenses = await expenseModel.find();
            return res.status(200).json({
                status: "success",
                message: "expenses get successfully",
                data: expenses,
            });
        }
    } catch (error) {
        console.error("Error in Expense controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Update a Expense by ID
const updateExpense = async (req, res) => {
    try {
        const { purchase_Date, description, amount } = req.body;

        const updatedExpense = await expenseModel.findByIdAndUpdate(
            req.params.id,
            { purchase_Date, description, amount },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                status: "Fail",
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Expense updated successfully.",
            data: updatedExpense,
        });
    } catch (error) {
        console.error("Error in Expense controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Soft delete a Expense (set `is_deleted` to true)
const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await expenseModel.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true }
        );

        if (!deletedExpense) {
            return res.status(404).json({
                status: "Fail",
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Expense deleted successfully.",
        });
    } catch (error) {
        console.error("Error in Expense controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};
