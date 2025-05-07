


// middleware/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = (handler) => async (req, res) => {
  try {
    if (cached.conn) {
      await mongoose.connect(process.env.MONGODB_URI,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // Use existing database connection
      return handler(req, res);
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false, // Disable mongoose buffering
        serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return handler(req, res);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return res.status(500).json({
      error: "Database connection failed",
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};