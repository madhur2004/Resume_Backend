const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Use Routes
app.use("/api/auth", authRoutes);    // signup/login goes to /api/auth/signup or /api/auth/login
app.use("/api/resume", resumeRoutes); // resume APIs

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
