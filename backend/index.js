const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const keys = require("./config/keys");

const app = express();

// Middleware
app.use(express.json());

// DB Config and Connection
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
