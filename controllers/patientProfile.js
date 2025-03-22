const patientModel = require("../model/patientModel");
const profileModel = require("../model/profileModel");




exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { patientId ,gender, age, address, location} = req.body;

        const getUser = await patientModel.findOne({patientId});

        if (!getUser) return res.status(400).json({message: "User not found"})

        let profile = await profileModel.findOne({ patientId });

        if (profile) {
            profile.gender = gender;
            profile.age = age;
            profile.address = address;
            profile.location = location;
        } else {
            profile = new profileModel({ patient: getUser._id, age, gender, address, location})
        }
        await profile.save();
        getUser.profile = profile._id;

        await getUser.save();

        res.json(profile)
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message})
    }
};