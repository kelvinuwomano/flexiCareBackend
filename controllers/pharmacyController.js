const bcrypt = require("bcrypt");
const crypto = require("crypto");
const pharmacyModel = require("../model/pharmacyModel");
const { verifyEmail, verifPharmacyEmail } = require("../services/mail");
const generateToken = require("../utils/generate");
const profileModel = require("../model/profileModel");
const pharmacyProfile = require("../model/pharmacyProfile");
const appointment = require("../model/appointment");


exports.createPharmacy = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const checkEmail = await pharmacyModel.findOne({email});
        if (checkEmail) return res.status(400).json({message: "Email already exist"})
        const hashPassword = await bcrypt.hash(password,10)
        const verificationToken = await crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = await Date.now() + 30 * 60 * 1000;

        const newPharmacy = await pharmacyModel.create({
            name,
            email, 
            password: hashPassword,
            verificationToken,
            verificationTokenExpires,
        });

        await newPharmacy.save();
        await verifPharmacyEmail(email, verificationToken)

        return res.status(200).json({message: "Pharmacy created successfully! Please verify your email"})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};

exports.verifyPharmacy = async (req, res) => {
    try {
        const {token} = req.params;
        
        const getPharmacy = await pharmacyModel.findOne({verificationToken: token});
        if (!getPharmacy) return res.status(400).json({message: "Invalid Token"});
        if (getPharmacy.verificationTokenExpires < Date.now()) return res.status(400).json({message: "Expired Token"})

        getPharmacy.isVerified = true;
        getPharmacy.verificationToken = null;
        getPharmacy.verificationTokenExpires = null;
        await getPharmacy.save();

        return res.status(200).json({message: "Verified successfully! You can now login"});

    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
}

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const checkEmail = await pharmacyModel.findOne({email});
        if (!checkEmail) return res.status(400).json({message: "User not found"})       
        
        const isMatch = await bcrypt.compare(password, checkEmail.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect password"});

        if(!checkEmail.isVerified) return res.status(400).json({message: "Please verify your email"});

        const token = generateToken(checkEmail._id, checkEmail.role)

        return res.status(200).json({message: "Login successful", name: checkEmail.name, email: checkEmail.email, id: checkEmail._id, token})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const validStatus =  ["Pending", "Confirmed", "Cancelled", "Completed"]

        if (!validStatus.includes(status)) return res.status(400).json({ message: "Invalid status." });

        const update = await appointment.findByIdAndUpdate(id,{status},{new: true});

        if (!update) return res.status(400).json({message: "Appointment not found"})
        return res.status(200).json({message: "Status update successfully!", update})
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


// exports.getNearbyPharmacy = async (req, res) => {
//     try {
//         const {patientId} = req.query;

//         const patientProfile = await profileModel.findOne({patientId});

//         if (!patientProfile) return res.status(400).json({message: "Patient profile not found"})
        
//         const {state, city, localGovernment} = patientProfile.location;

//         const getPharmacy = await pharmacyProfile.find({
//             $or : [
//                 {'location.state': state},
//                 {'location.city': city},
//                 {'location.localGovernment': localGovernment}
//             ]
//         }).populate("pharmacy");

//         res.status(200).json({message: "Nearby pharmacy", data: getPharmacy})
//     } catch (error) {
//         return res.status(500).json({message: "An error occurred", error: error.message})
//     }
// }