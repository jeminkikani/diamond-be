const LoginModel = require("../models/login.model");
var Token = require("../models/token.model");
var jwt = require("jsonwebtoken");

// ================================================LOGIN_DETAILS=======================
exports.login_page = async function (req, res) {
    try {
        const { login_id, password } = req.body;

        const loginIdFind = await LoginModel.findOne({ login_id });

        if (!loginIdFind) {
            return res.status(404).json({
                status: "Fail",
                message: "Enter valid loginid",
            });
        }

        const tokenFind = await Token.findOneAndUpdate({
            id: loginIdFind._doc._id,
            isActive: true,
        });
        console.log(tokenFind);

        if (loginIdFind.password !== password) {
            console.log("password", password);
            return res.status(404).json({
                status: "Fail",
                message: "Enter valid password",
            });
        }

        const payload = {
            id: loginIdFind._id,
            login_id: loginIdFind.login_id,
            password: loginIdFind.password,
        };

        var token = jwt.sign(payload, process.env.KEY, { expiresIn: "1d" });

        const tokenSave = new Token({
            id: loginIdFind._id,
            token: token,
        });

        await tokenSave.save();

        return res.status(200).json({
            status: "Success",
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Failed to login",
        });
    }
};

exports.logout_page = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                status: "Fail",
                message: "No token provided",
            });
        }

        // Find and delete the token from the database
        const tokenDelete = await Token.findOneAndUpdate({ isActive: true });

        if (!tokenDelete) {
            return res.status(404).json({
                status: "Fail",
                message: "Invalid token or user already logged out",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Logout successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Failed to logout",
        });
    }
};
