const express = require("express");
const { createOrUpdateProfile } = require("../controllers/patientProfile");
const { protect } = require("../middleware/authMiddleware");



const profileRouter = express.Router();


profileRouter.post("/profile", protect, createOrUpdateProfile)

module.exports = profileRouter