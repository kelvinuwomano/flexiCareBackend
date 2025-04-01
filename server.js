const express = require("express");
const database = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const patientRouter = require("./routes/patientRoute");
const pharmacyRouter = require("./routes/pharmacyRoute");
const profileRouter = require("./routes/profileRoute");
const pharmacyProfileRoute = require("./routes/pharmacyProfileRoute");
const adminRouter = require("./routes/adminRoute");
require("dotenv/config");


const {PORT} = process.env;

console.log(PORT);

const port = PORT;

const app = express();

database();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", patientRouter)
app.use("/api/pharmacy", pharmacyRouter)
app.use("/api/patient-profile", profileRouter)
app.use("/api/pharmacy-profile", pharmacyProfileRoute)
app.use("/api/admin", adminRouter)

app.listen(port, () => {
    console.log(new Date().toLocaleString(), port)
});
