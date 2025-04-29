import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import crypto from "crypto";

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }

    // Find user with non-expired OTP
    const user = await User.findOne({ 
      email,
      'otp.expiresAt': { $gt: new Date() }
    });

    if (!user || user.otp.code !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP' 
      });
    }

    // Generate reset token (valid for 10 minutes)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Store reset token and clear OTP
    await User.findOneAndUpdate(
      { email },
      { 
        resetToken: {
          token: resetToken,
          expiresAt: resetTokenExpires
        },
        $unset: { otp: 1 } // Remove OTP
      }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully',
      resetToken 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

export default connectDB(handler);