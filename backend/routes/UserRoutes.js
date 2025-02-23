const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
router.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
router.use(cookieParser());

// User Signup
router.post("/signup", [
    body('username').notEmpty().withMessage("Username is required."),
    body('email').notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email format."),
    body('termsAccepted').notEmpty().withMessage("You must accept the Terms and Conditions.").toBoolean(),
    body('password').notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }

    const { username, email, termsAccepted, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: "An account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            termsAccepted,
            password: hashedPassword,
            giftsSubscribed: false,
            created_at: new Date(),
            updated_at: new Date()
        });

        const userNew = await user.save();
        res.status(201).json({ message: "User created successfully.", user_id: userNew._id });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to create User", error: error.message });
    }
});

// User Login
router.post("/login", [
    body('email').notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email format."),
    body('password').notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
], async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(", ") });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: false, message: "Invalid credentials." });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Store token in httpOnly cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        res.json({ message: "Login successful." });

    } catch (error) {
        res.status(500).json({ status: false, message: "An error occurred when logging in.", error: error.message });
    }
});

// User Logout
router.post("/logout", (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });

    res.json({ message: "Logged out successfully" });
});

// Get User Profile (Protected Route)
router.get("/profile", authenticate, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error" });
    }
});

module.exports = router;
