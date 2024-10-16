const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        mongoose
            .connect(process.env.MONGO_URI)
            .then(async () => {
                console.log("database connection successfully.");
            })
            .catch((error) => {
                console.log("Error found on database connection.", error);
            });
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};
dbConnection();
