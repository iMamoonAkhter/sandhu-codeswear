
// middleware/mongoose.js
import mongoose from "mongoose";

let isConnected = false; // Avoid multiple connections in development

export const connectDB = (handler) => async (req, res) => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI).then(() => {console.log("Mongo DB connected")});
      isConnected = true;
    } catch (error) {
      
      return res.status(500).json({ 
        error: "Database connection failed",
        details: error
      });
    }
  }

  return handler(req, res); // Pass control to the actual API route handler
};


