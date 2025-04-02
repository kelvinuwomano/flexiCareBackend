const mongoose= require("mongoose");
const appointment = require("../model/appointment");
const patientModel = require("../model/patientModel");
const pharmacyModel = require("../model/pharmacyModel");




exports.bookAppointment = async (req, res) => {
    try {
        const patientId = req.user.id; // Extracting patientId from JWT

        console.log(patientId)
        const { pharmacyId, startDate, endDate, time } = req.body;

        if (!patientId || !pharmacyId || !startDate || !endDate || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const patient = await patientModel.findById(patientId);
        const pharmacy = await pharmacyModel.findById(pharmacyId);

        if (!patient || !pharmacy) {
            return res.status(400).json({ message: "Invalid patient or pharmacy" });
        }

        const newAppointment = new appointmentModel({
            patientId,
            pharmacyId,
            startDate,
            endDate,
            time,
            status: "Pending",
        });

        patient.appointment.push(new mongoose.Types.ObjectId(newAppointment._id));
        pharmacy.appointment.push(new mongoose.Types.ObjectId(newAppointment._id));

        await newAppointment.save();
        await patient.save();
        await pharmacy.save();

        return res.status(200).json({
            message: "Appointment has been booked successfully",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


exports.getAllAppointment = async (req, res) => {
  try {
    const {userId} = req.params;
    const allAppointment = await appointment.find({patientId:userId}).populate({
        path:"pharmacyId",
        select:"name  profile"
    }).populate({
        path: "patientId",
        select: "name  profile"
    })
    return res.status(200).json({allAppointment})
  } catch (error) {
    return res.status(500).json({message: "An error occurred", error: error.message})
  }
}

exports.getAllPharmacyAppointments = async (req, res) => {
    try {
      const {pharmacyId} = req.params;
      const allAppointment = await appointment.find({pharmacyId: pharmacyId}).populate({
          path:"pharmacyId",
          select:"name  profile"
      }).populate({
          path: "patientId",
          select: "name  profile"
      })
      return res.status(200).json({allAppointment})
    } catch (error) {
      return res.status(500).json({message: "An error occurred", error: error.message})
    }
  };

  exports.cancelAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        const findAppointment = await appointment.findById(id);

        if (!findAppointment) return res.status(400).json({message: "Appointment not found"});

        await appointment.findByIdAndDelete(id)
        return res.status(200).json({ message: "Appointment cancelled successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }