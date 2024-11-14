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
    is_deleted: {
        type: Boolean,
        default: false,
    },
};

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = expenseModel;
