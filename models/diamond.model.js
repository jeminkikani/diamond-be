const mongoose = require("mongoose");
const diamondSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    diamondType: { type: String, required: true },
    price: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    partyName: { type: String, required: true },
    days: { type: String },
    diamondPayment: { type: Number, required: true },
    diamondPaymentPercentage: { type: Number, required: true },
    brokerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "broker",
    },
    // percentage: { type: Number, required: true },
    brokerage: { type: Number },
    amountAfterBrokerage: { type: Number, required: true },
    entryType: { type: String, enum: ["incoming", "outgoing"], required: true },
    isDeleted: { type: Boolean, default: false },
});

const diamondModel = mongoose.model("diamond", diamondSchema);

module.exports = diamondModel;
