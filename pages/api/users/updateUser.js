import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ success: false, message: "Token required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Update allowed fields (excluding email)
      const { firstName, lastName, phone, dob, gender, newsletter } = req.body;
      
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phone) user.phone = phone;
      if (dob) user.dob = dob;
      if (gender) user.gender = gender;
      if (typeof newsletter !== 'undefined') user.newsletter = newsletter;

      await user.save();

      // Return updated user without password
      const updatedUser = await User.findById(user._id).select("-password");

      res.status(200).json({ 
        success: true, 
        user: updatedUser,
        message: "Profile updated successfully"
      });

    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error updating profile" 
      });
    }
  } else {
    res.status(400).json({ 
      success: false, 
      message: "This method is not allowed" 
    });
  }
};

export default connectDB(handler);