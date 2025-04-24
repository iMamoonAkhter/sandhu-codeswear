import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.body.token;

      if (!token) {
        return res.status(401).json({ success: false, message: "Token required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password"); // exclude password

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("getUser error:", error);
      res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  } else {
    res.status(400).json({ success: false, message: "This method is not allowed" });
  }
};

export default connectDB(handler);
