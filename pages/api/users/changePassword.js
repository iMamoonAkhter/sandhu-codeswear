// pages/api/users/changePassword.js
import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Get token from authorization header
    const email = req.headers.authorization;
    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { currentPassword, newPassword } = req.body;
    console.log('curee:', currentPassword, 'new:', newPassword);
    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Find user by token (adjust based on your auth system)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Decrypt stored password for comparison
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Verify current password
    if (currentPassword !== decryptedPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Encrypt new password before saving
    const encryptedPassword = CryptoJS.AES.encrypt(
      newPassword, 
      process.env.SECRET_KEY
    ).toString();

    // Update password
    user.password = encryptedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default connectDB(handler);