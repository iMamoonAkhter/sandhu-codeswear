// middleware/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local or in your Vercel settings'
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

/**
 * Middleware to handle MongoDB connection
 * @param {function} handler - The API route handler
 * @returns {function} Connected handler
 */
export const connectDB = (handler) => async (req, res) => {
  try {
    // If we have a cached connection, use it
    if (cached.conn) {
      return handler(req, res);
    }

    // If no connection promise exists, create one
    if (!cached.promise) {
      const opts = {
        bufferCommands: false, // Disable mongoose buffering
        serverSelectionTimeoutMS: 10000, // Timeout after 10s if no server is selected
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        maxPoolSize: 10, // Maintain up to 10 socket connections
        retryWrites: true,
        appName: 'your-app-name' // Identify your application in MongoDB Atlas
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      }).catch(err => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
    }

    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
    
    // Add event listeners for connection monitoring
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from DB');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return handler(req, res);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return res.status(500).json({
      error: "Database connection failed",
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : null
    });
  }
};

/**
 * Direct connection method for non-API usage
 * @returns {Promise} Mongoose connection promise
 */
export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Helper function to check connection status
export function checkConnection() {
  return mongoose.connection.readyState;
}