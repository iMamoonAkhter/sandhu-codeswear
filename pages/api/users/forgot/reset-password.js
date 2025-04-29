import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, newPassword, resetToken } = req.body;
    
    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, new password and reset token are required' 
      });
    }

    // Find user with valid reset token
    const user = await User.findOne({ 
      email,
      'resetToken.expiresAt': { $gt: new Date() },
      'resetToken.token': resetToken
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters' 
      });
    }

    // Encrypt new password
    const encryptedPassword = CryptoJS.AES.encrypt(
      newPassword, 
      process.env.SECRET_KEY
    ).toString();

    // Update password and clear reset token
    await User.findOneAndUpdate(
      { email },
      { 
        password: encryptedPassword,
        $unset: { resetToken: 1 }
      }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

export default connectDB(handler);