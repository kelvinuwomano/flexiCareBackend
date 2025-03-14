const express = require("express");
const database = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const patientRouter = require("./routes/patientRoute");
require("dotenv/config");


const {PORT} = process.env;

console.log(PORT);

const port = PORT;

const app = express();

database();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api", patientRouter)

app.listen(port, () => {
    console.log(new Date().toLocaleString(), port)
});