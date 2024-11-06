const diamondModel = require("../models/diamond.model");

const addDiamond = async (req, res) => {
    try {
        const {
            date,
            weight,
            diamondType,
            price,
            totalPayment,
            partyName,
            brokerName,
            paymentDate,
            percentage,
            brokerage,
            amountAfterBrokerage,
        } = req.body;
        const newDiamond = new diamondModel({
            date,
            weight,
            diamondType,
            price,
            totalPayment,
            partyName,
            brokerName,
            paymentDate,
            percentage,
            brokerage,
            amountAfterBrokerage,
        });
        const savedDiamond = await newDiamond.save();
        return res.status(201).json({
            status: "success",
            message: "Diamond Entry added successfully.",
            data: savedDiamond,
        });
    } catch (error) {
        console.error("Error in adding diamond:", error);
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

const getAllDiamonds = async (req, res) => {
    try {
        const diamonds = await diamondModel.find({ isDeleted: false });
        return res.status(200).json({
            status: "success",
            message: "Diamonds Entry retrieved successfully.",
            data: diamonds,
        });
    } catch (error) {
        console.error("Error in retrieving diamonds:", error);
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

const updateDiamond = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDiamond = await diamondModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        if (!updatedDiamond) {
            return res
                .status(404)
                .json({ status: "fail", message: "Diamond Entry not found." });
        }
        return res.status(200).json({
            status: "success",
            message: "Diamond Entry updated successfully.",
            data: updatedDiamond,
        });
    } catch (error) {
        console.error("Error in updating diamond:", error);
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

const deleteDiamond = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDiamond = await diamondModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedDiamond) {
            return res
                .status(404)
                .json({ status: "fail", message: "Diamond not found." });
        }
        return res.status(200).json({
            status: "success",
            message: "Diamond Entry deleted successfully.",
        });
    } catch (error) {
        console.error("Error in deleting diamond:", error);
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

module.exports = { addDiamond, getAllDiamonds, updateDiamond, deleteDiamond };
