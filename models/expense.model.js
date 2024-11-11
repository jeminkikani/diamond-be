const { default: mongoose } = require("mongoose");

const expenseSchema = {
    purchase_Date: {
        type: Date,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
};

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = expenseModel;
