import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTHENTICATION_EMAIL,
    pass: process.env.AUTHENTICATION_PASSWORD,
  },
});

const sendEmailOTP = async (email, OTP) => {
  const mailOptions = {
    from: `"Password Recovery" <${process.env.AUTHENTICATION_EMAIL}>`,
    to: email,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; padding: 20px;">
          <h2 style="text-align: center; color: #17aae0">Password Reset OTP</h2>
          <p style="text-align: center; font-size: 24px; font-weight: bold; color: #333;">${OTP}</p>
          <p style="text-align: center; color: #666;">This OTP is valid for 10 minutes.</p>
        </div>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate 6-digit OTP
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await User.findOneAndUpdate(
      { email },
      { 
        otp: {
          code: OTP,
          expiresAt
        }
      }
    );

    // Send OTP via email
    await sendEmailOTP(email, OTP);

    return res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

export default connectDB(handler);