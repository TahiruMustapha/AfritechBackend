const express = require("express");
require("dotenv").config();
const mongoose  = require("mongoose");
const authRoutes = require("./src/routes/auth");
const registerCourseRoutes = require("./src/routes/courseRegistration");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/courseRegistration", registerCourseRoutes);
// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Error connecting to database",err);
})

const PORT  = 5001;
app.listen(PORT, () => {
  console.log("Server is running on port 5001");
});
