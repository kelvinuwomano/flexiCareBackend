const express = require("express");
const { createOrUpdateProfile } = require("../controllers/patientProfile");



const profileRouter = express.Router();


profileRouter.post("/profile", createOrUpdateProfile)

module.exports = profileRouter