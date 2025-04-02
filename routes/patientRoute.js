const express = require("express");
const { signUp, verificationEmail, login, forgotPassword, resetPassword, getAllPharmacy } = require("../controllers/patientController");
const { bookAppointment, getAllAppointment, cancelAppointment } = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
// const { getNearbyPharmacy } = require("../controllers/pharmacyController");




const patientRouter = express.Router();

patientRouter.post("/signup", signUp)
patientRouter.get("/verify/:token", verificationEmail)
patientRouter.post("/login", login)
patientRouter.post("/forgot-password", forgotPassword)
patientRouter.post("/reset-password/:token", resetPassword)
patientRouter.get("/all-pharmacy", getAllPharmacy)
patientRouter.post("/book-appointment", protect, bookAppointment)
patientRouter.get("/all-appointments/:userId", getAllAppointment)
patientRouter.delete("/cancel-appointment/:id", cancelAppointment)
// patientRouter.get("/for-you", getNearbyPharmacy)




module.exports = patientRouter