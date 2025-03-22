const pharmacyModel = require("../model/pharmacyModel");
const pharmacyProfile = require("../model/pharmacyProfile");




exports.createOrUpdateProfilePharmacy = async (req, res) => {
    try {
        const { pharmacyId ,phoneNumber, description, licenseNumber, address, location} = req.body;

        const getPharmacy = await pharmacyModel.findOne( {pharmacyId })

        if (!getPharmacy) return res.status(400).json({message: "Pharmacy not found"})

        let profile = await pharmacyProfile.findOne({pharmacyId });

        if (profile) {
            profile.phoneNumber = phoneNumber;
            profile.description = description;
            profile.licenseNumber = licenseNumber;
            profile.address = address;
            profile.location = location;
        } else {
            profile = new pharmacyProfile({ pharmacy: getPharmacy._id, description, licenseNumber, address, location})
        }
        await profile.save();
        getPharmacy.profile = profile._id;
        await getPharmacy.save();
        res.json(profile)
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
};