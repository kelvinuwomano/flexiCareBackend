const express = require("express");
const { createAdmin, getOneUser, getAllPharmacy } = require("../controllers/adminController");



const adminRouter = express.Router();

adminRouter.post("/create", createAdmin)
adminRouter.get("/get-one-user/:id", getOneUser)
adminRouter.get("/all-pharmacies", getAllPharmacy)


module.exports = adminRouter