const mongoose = require("mongoose");
const diamondSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    diamondType: { type: String, required: true },
    price: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    partyName: { type: String, required: true },
    brokerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "broker",
        required: true,
    },
    paymentDate: { type: Date, required: true },
    percentage: { type: Number, required: true },
    brokerage: { type: Number, required: true },
    amountAfterBrokerage: { type: Number, required: true },
    entryType: { type: String, enum: ["incoming", "outgoing"], required: true },
    isDeleted: { type: Boolean, default: false },
});




const diamondModel = mongoose.model("diamond", diamondSchema);

module.exports = diamondModel;
