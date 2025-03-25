const bcrypt = require("bcrypt");
const crypto = require("crypto");
const patientModel = require("../model/patientModel");
const { verifyEmail, resetEmail } = require("../services/mail");
const generateToken = require("../utils/generate");
const pharmacyModel = require("../model/pharmacyModel");



exports.signUp = async (req, res) => {
    try {
        const {fullName, phoneNo, email, password} = req.body;

        const checkEmail = await patientModel.findOne({email});
        if (checkEmail) return res.status(400).json({message: "Email already exists"});
            
        const checkNumber = await patientModel.findOne({phoneNo});
        if (checkNumber) return res.status(400).json({message: "Phone Number already exists"});
        
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = await crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = await Date.now() + 60 * 60 * 1000;

        const newPatient = await patientModel.create({
            fullName,
            phoneNo,
            email,
            password : hashPassword,
            verificationToken,
            verificationTokenExpires,
        });
        await newPatient.save();
        await verifyEmail(email, verificationToken)

        return res.status(200).json({message: "User Created! Please verify your email"})
    } catch (error) {
        return res.status(500).json({message:"An error occured", error: error.message})
    }
};

exports.verificationEmail = async (req, res) => {
    try {
        const {token} = req.params;

        const getPatient = await patientModel.findOne({verificationToken: token});
        if (!getPatient) return res.status(400).json({message: "Invalid Token"})
        if (getPatient.verificationTokenExpires < Date.now()) {
            return res.status(400).json({message:"Expired token"})
        };  
        getPatient.isVerified = true;
        getPatient.verificationToken = null;
        getPatient.verificationTokenExpires = null;
        await getPatient.save();
        return res.status(200).json({message: "User verified!! You can now login"})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const checkEmail = await patientModel.findOne({email});
        if (!checkEmail) return res.status(400).json({message: "User not found"})

        const isMatch = await bcrypt.compare(password, checkEmail.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect password"})
        
        if (!checkEmail.isVerified) return res.status(400).json({message: "Please verify your email"})

        const token = generateToken(checkEmail._id, checkEmail.role)

        return res.status(200).json({message: "Login successful", fullName: checkEmail.fullName, email: checkEmail.email, id: checkEmail._id, phoneNo: checkEmail.phoneNo, token})
    
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await patientModel.findOne({email});
        if (!user) return res.status(400).json({message: "User not found"});
        
        user.resetToken = await crypto.randomBytes(32).toString("hex");
        user.resetTokenExpires = await Date.now() +  10 * 60 * 1000;
        await user.save();

        await resetEmail(email, user.resetToken)
        return res.status(200).json({message:"reset link sent"})
    } catch (error) {
        return res.status(400).json({message:"An error occured", error: error.message})
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {newPassword} = req.body;

        const user = await patientModel.findOne({resetToken: token})
        if (!user) return res.status(400).json({message: "Invalid Token"})
        if (user.resetTokenExpires < Date.now()) return res.status(400).json({message: "Expired Token"})
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save()

        return res.status(200).json({message:"Password reset successfully"})
    } catch (error) {
        return res.status(400).json({message:"An error occured" , error: error.message})
    }
};


exports.getAllPharmacy = async (req, res) => {
    try {
        const allPharmacy = await pharmacyModel.find().select("-password");
        return res.status(200).json({message: "All pharmacies", data: allPharmacy})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};