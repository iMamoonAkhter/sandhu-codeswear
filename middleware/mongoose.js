// middleware/mongoose.js
import mongoose from "mongoose";

let isConnected = false; // Avoid multiple connections in development

export const connectDB = (handler) => async (req, res) => {
  if (!isConnected) {
    try {
      await mongoose.connect("mongodb+srv://imamoonakhter:WnFVSVONpbv9uULB@cluster0.8lrkis4.mongodb.net/sandhucodeswear");
      isConnected = true;
    } catch (error) {
      
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  return handler(req, res); // Pass control to the actual API route handler
};
