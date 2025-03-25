const express = require("express");
const { createAdmin, getOneUser, getAllPharmacy, getAllUsers, loginAdmin } = require("../controllers/adminController");



const adminRouter = express.Router();

adminRouter.post("/create", createAdmin)
adminRouter.get("/get-one-user/:id", getOneUser)
adminRouter.get("/all-pharmacies", getAllPharmacy)
adminRouter.get("/all-users", getAllUsers)
adminRouter.post("/admin-login", loginAdmin)


module.exports = adminRouter