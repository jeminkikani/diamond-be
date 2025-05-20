const brokerModel = require("../models/broker.model");

// Create a new broker
const addBroker = async (req, res) => {
    try {
        const { name, mobile_no } = req.body;

        const newBroker = new brokerModel({
            name,
            mobile_no,
        });

        const savedBroker = await newBroker.save();
        return res.status(201).json({
            status: "success",
            message: "Broker added successfully.",
            data: savedBroker,
        });
    } catch (error) {
        console.error("Error in Broker controller", error);
        return res.status(400).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Get brokers (all or by ID)
const getBrokers = async (req, res) => {
    try {
        const brokerId = req.params.id;

        if (brokerId) {
            // Fetch specific broker by ID
            const broker = await brokerModel.findById(brokerId);
            if (!broker || broker.is_deleted) {
                return res.status(404).json({
                    status: "Fail",
                    message: "Broker not found",
                });
            }
            return res.status(200).json({
                status: "success",
                data: broker,
            });
        } else {
            // Fetch all brokers
            const brokers = await brokerModel.find({ is_deleted: false }).sort({ date: -1 });
            return res.status(200).json({
                status: "success",
                message: "brokers get successfully",
                data: brokers,
            });
        }
    } catch (error) {
        console.error("Error in Broker controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Update a broker by ID
const updateBroker = async (req, res) => {
    try {
        const { name, mobile_no } = req.body;

        const updatedBroker = await brokerModel.findByIdAndUpdate(
            req.params.id,
            { name, mobile_no },
            { new: true }
        );

        if (!updatedBroker) {
            return res.status(404).json({
                status: "Fail",
                message: "Broker not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Broker updated successfully.",
            data: updatedBroker,
        });
    } catch (error) {
        console.error("Error in Broker controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

// Soft delete a broker (set `is_deleted` to true)
const deleteBroker = async (req, res) => {
    try {
        const deletedBroker = await brokerModel.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true }
        );

        if (!deletedBroker) {
            return res.status(404).json({
                status: "Fail",
                message: "Broker not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Broker deleted successfully.",
        });
    } catch (error) {
        console.error("Error in Broker controller", error);
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        });
    }
};

module.exports = {
    addBroker,
    getBrokers,
    updateBroker,
    deleteBroker,
};
