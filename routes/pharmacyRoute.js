const express = require("express");
const { createPharmacy, verifyPharmacy, signin, updateAppointmentStatus } = require("../controllers/pharmacyController");
const { getAllPharmacyAppointments } = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");


const pharmacyRouter = express.Router();

pharmacyRouter.post("/signup", createPharmacy)
pharmacyRouter.get("/verify/:token", verifyPharmacy)
pharmacyRouter.post("/signin", signin)
pharmacyRouter.get("/get-appointments/", protect, getAllPharmacyAppointments)
pharmacyRouter.patch("/update-status/:id", updateAppointmentStatus)


module.exports = pharmacyRouter