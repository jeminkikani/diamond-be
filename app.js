require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ip = require("ip");
require("./config/dbConnection");
const cors = require("cors");
const router = require("./routes");
const app = express();

app.use(cors("*"));
process.on("unhandledRejection", (err, promise) => {
    console.error("Unhandled Rejection:", err);
    // You can log the error, send an email notification, or perform any other necessary action
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    // You can log the error, send an email notification, or perform any other necessary action
    process.exit(1); // Exit the process with a non-zero exit code
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://${ip.address()}:${PORT}`);
});
