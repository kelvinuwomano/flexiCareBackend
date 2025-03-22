const jwt = require("jsonwebtoken");


exports.protect = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({message: "Unauthorised"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token", error: error.message})
    }
};

exports.adminMiddleware = (req, res, next) => {
    if (req.user || req.user.role !== "admin") {
        return res.status(400).json({message: "Access denied"})
    }
    next();
}