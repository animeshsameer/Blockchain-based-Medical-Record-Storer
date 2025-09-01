require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const recordRoutes = require("./routes/recordRoutes");
const authRoutes = require("./routes/auth"); // ✅ import auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // ✅ in case you're not using bodyParser in newer versions

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/medicalRecordsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/records", recordRoutes);
app.use("/api/auth", authRoutes); // ✅ mount auth route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
