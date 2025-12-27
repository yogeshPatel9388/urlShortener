const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. Middleware
// Basic CORS setup allows your Vercel frontend to communicate with this Render API
app.use(cors());
app.use(express.json());

// 2. MongoDB Connection with Error Handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};
connectDB();

// 3. Routes

// Fix for "Cannot GET /" - Provides a health check for your API
app.get("/", (req, res) => {
  res.status(200).send("LinkZap API is running and ready to shorten URLs!");
});

// Import and use URL routes
app.use("/", require("./routes/url"));

// 4. Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
