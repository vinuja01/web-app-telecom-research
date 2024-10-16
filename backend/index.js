const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const siteRoutes = require("./routes/siteRoutes");
const userAssignRoutes = require("./routes/userAssignRoutes");
const alertRoutes = require("./routes/alertRoutes");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// DB Config and Connection
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/sites", siteRoutes);
app.use("/assignuser", userAssignRoutes);
app.use("/alerts", alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
