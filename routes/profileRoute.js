const express = require("express");
const { createOrUpdateProfile, getProfile } = require("../controllers/patientProfile");
const { protect } = require("../middleware/authMiddleware");



const profileRouter = express.Router();


profileRouter.post("/profile", protect, createOrUpdateProfile)
profileRouter.get("/get-profile/:id", protect, getProfile)

module.exports = profileRouter