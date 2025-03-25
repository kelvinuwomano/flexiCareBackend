const bcrypt = require("bcrypt");
const adminModel = require("../model/adminModel");
const patientModel = require("../model/patientModel");
const pharmacyProfile = require("../model/pharmacyProfile");



exports.createAdmin = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const newAdmin = adminModel.create({
            name,
            email,
            password: hashPassword,
        });

        return res.status(200).json({message: "Created", newAdmin})
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: errror.message})
    }
};


exports.getOneUser = async (req, res) => {
    try {
        const {id} = req.params;
        const oneUser = await patientModel.findById(id).populate("profile").select("-password");

        if (!oneUser) return res.status(400).json({message: "User not found"});

        return res.status(200).json({message: "User gotten successful", data: oneUser});

    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

exports.getPharmacy = async (req, res) => {
    try {
        const {id}  = req.params;

    const onePharmacy = await pharmacyProfile.findById(id).populate("pharmacyProfile").select("-password");

    if (!onePharmacy) return res.status(400).json({message: "Pharmacy not found"});

    return res.status(200).json({message: "Success", data: onePharmacy });

    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message});
    }
};

exports.getAllPharmacy = async (req, res) => {
    try {
        const allPharmacy = await pharmacyModel.find().populate("pharmacyProfile").select("-password");
        return res.status(200).json({message: "All pharmacies", data: allPharmacy});
    } catch (error) {
        return res.status(500).json({message: "An error occured", error: error.message})
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await patientModel.find().populate("profile").select("-password");
        return res.status(200).json({message: "All users gotten successfully", data: allUsers});
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const checkEmail = await adminModel.findOne({email});

        if (!checkEmail) return res.status(400).json({message: "Invalid email"});

        const isMatch = await bcrypt.compare(password, checkEmail.password);

        if (!isMatch) return res.status(400).json({message: "Incorrect password"});

        return res.status(200).json({message: "Login successful"});
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
}