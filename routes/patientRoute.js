const express = require("express");
const { signUp, verificationEmail, login, forgotPassword, resetPassword } = require("../controllers/patientController");



const patientRouter = express.Router();

patientRouter.post("/signup", signUp)
patientRouter.get("/verify/:token", verificationEmail)
patientRouter.post("/login", login)
patientRouter.post("/forgot-password", forgotPassword)
patientRouter.post("/reset-password/:token", resetPassword)




module.exports = patientRouter