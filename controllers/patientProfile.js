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

exports.getProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const findProfile = await profileModel.findById(id);

        if (!findProfile) return res.status(400).json({message: "User not found"});

        return res.status(200).json({message: "Gotten profile successfully", data: findProfile});

    } catch (error) {
        return res.status(500).json({message: "An error occurred", error})
    }
}