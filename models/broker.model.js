const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile_no: {
            type: String,
            required: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const brokerModel = mongoose.model("broker", brokerSchema);

module.exports = brokerModel;
