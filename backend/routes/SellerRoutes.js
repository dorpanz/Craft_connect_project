const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const sellerModel = require("../models/SellerModel");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
router.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
}));

// Seller Signup
router.post("/signup", [
    body('fullName').notEmpty().withMessage("Full name is required."),
    body('email').notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email format."),
    body('streetAddress').notEmpty().withMessage("Street Address is required."),
    body('city').notEmpty().withMessage("City is required."),
    body('postCode').notEmpty().withMessage("Post Code is required."),
    body('isInCanada').isBoolean().withMessage("You must live in Canada to continue."),
    body('termsAccepted').isBoolean().withMessage("You must agree to the Terms and Conditions."),
    body('shopName').notEmpty().withMessage("Shop Name is required."),
    body('password').notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array().map(err => err.msg).join(', ') });
    }

    const { fullName, email, streetAddress, city, postCode, isInCanada, shopName, termsAccepted, password } = req.body;

    try {
        const existingSeller = await sellerModel.findOne({ $or: [{ email }, { shopName }] });
        if (existingSeller) {
            return res.status(400).json({ status: false, message: "An account with this email or shop name already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const seller = new sellerModel({
            fullName,
            email,
            streetAddress,
            city,
            postCode,
            isInCanada,
            shopName,
            termsAccepted,
            password: hashedPassword,
            newsletterSubscribed: false,
            created_at: new Date(),
            updated_at: new Date()
        });

        const sellerNew = await seller.save();
        res.status(201).json({ message: "Seller created successfully.", seller_id: sellerNew._id });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to create Seller", error: error.message });
    }
});

// Seller Login - Stores JWT in httpOnly cookie
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
        const seller = await sellerModel.findOne({ email });
        if (!seller) {
            return res.status(400).json({ status: false, message: "Invalid email" });
        }

        const isValidPassword = await bcrypt.compare(password, seller.password);
        if (!isValidPassword) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: seller._id, role: "seller" }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Store token in an httpOnly cookie
        res.cookie("authToken", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict", 
        });

        res.json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ status: false, message: "An error occurred when logging in.", error: error.message });
    }
});

// Seller Logout - Clears JWT cookie
router.post("/logout", (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    res.json({ message: "Logged out successfully" });
});

// Seller Profile
router.get("/profile", authenticate, async (req, res) => {
    try {
        const seller = await sellerModel.findById(req.user.id).select("-password");
        if (!seller) {
            return res.status(404).json({ status: false, message: "Seller not found" });
        }
        res.json({ status: true, seller });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error" });
    }
});

module.exports = router;
