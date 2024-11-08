const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = Schema({
    login_id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});
const LoginModel = mongoose.model("Login", loginSchema);

module.exports = LoginModel;
