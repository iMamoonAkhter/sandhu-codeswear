// middleware/mongoose.js
import mongoose from "mongoose";

let isConnected = false; // Avoid multiple connections in development

export const connectDB = (handler) => async (req, res) => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    } catch (error) {
      
      return res.status(500).json({ 
        error: "Database connection failed",
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  }

  return handler(req, res); // Pass control to the actual API route handler
};
