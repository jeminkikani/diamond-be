const diamondModel = require("../models/diamond.model");

const addDiamond = async (req, res) => {
    try {
        const {
            date,
            weight,
            diamondType,
            price,
            partyName,
            brokerName,
            brokerage,
            amountAfterBrokerage,
            totalPayment,
            days,
            diamondPayment,
            diamondPaymentPercentage,
            entryType,
        } = req.body;

        // Validate entryType
        if (!["incoming", "outgoing"].includes(entryType)) {
            return res
                .status(400)
                .json({ status: "fail", message: "Invalid entryType value." });
        }

        const newDiamond = new diamondModel({
            date,
            weight,
            diamondType,
            price,
            totalPayment,
            partyName,
            brokerName: brokerName || null,
            brokerage: brokerage || null,
            amountAfterBrokerage,
            days,
            diamondPayment,
            diamondPaymentPercentage,
            entryType, // Save entryType
        });

        const savedDiamond = await newDiamond.save();
        return res.status(201).json({
            status: "success",
            message: "Diamond entry added successfully.",
            data: savedDiamond,
        });
    } catch (error) {
        console.error("Error in adding diamond:", error);
        return res.status(400).json({ status: "fail", message: error.message });
    }
};

const getAllDiamonds = async (req, res) => {
    try {
        const { id } = req.params;
        const { entryType } = req.query; // Get entryType from query

        if (id) {
            // Fetch specific diamond by ID
            const diamond = await diamondModel
                .findById(id)
                .populate("brokerName");
            if (!diamond || diamond.isDeleted) {
                return res.status(404).json({
                    status: "Fail",
                    message: "Entry not found",
                });
            }
            return res.status(200).json({
                status: "success",
                data: diamond,
            });
        } else {
            if (!entryType) {
                return res.status(204).json({
                    status: "Fail",
                    message: `Diamond entries type not found.`,
                });
            }
            // Fetch diamonds filtered by entryType if provided
            const filter = { isDeleted: false };
            if (entryType) {
                filter.entryType = entryType;
            }
            const diamonds = await diamondModel
                .find(filter)
                .populate("brokerName")
                .sort({ date: -1 });

            return res.status(200).json({
                status: "success",
                message: `Diamond entries ${diamonds.length} retrieved successfully.`,
                data: diamonds,
            });
        }
    } catch (error) {
        console.error("Error in retrieving diamonds:", error);
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

const updateDiamond = async (req, res) => {
    try {
        const { id } = req.params;
        const { entryType } = req.body;

        if (entryType && !["incoming", "outgoing"].includes(entryType)) {
            return res
                .status(400)
                .json({ status: "fail", message: "Invalid entryType value." });
        }

        const updatedDiamond = await diamondModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedDiamond) {
            return res
                .status(404)
                .json({ status: "fail", message: "Diamond entry not found." });
        }

        return res.status(200).json({
            status: "success",
            message: "Diamond entry updated successfully.",
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

// db.getCollection("books").updateMany({ $set: { "entryType":"incoming"} })
