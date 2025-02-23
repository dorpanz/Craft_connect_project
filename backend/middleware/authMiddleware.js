const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.cookies.authToken; // Read token from cookies

    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticate;
