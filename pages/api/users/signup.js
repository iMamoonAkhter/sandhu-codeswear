import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const { firstName, lastName, email, phone, dob, gender, newsletter, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || newsletter === undefined) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const userEmail = await User.find({ email });
    if (userEmail.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    let u = new User({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      newsletter,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    });

    try {
      await u.save();
      return res.status(200).json({ success: true, message: "Account created successfully" });
    } catch (err) {
      console.error("Error saving user:", err);
      return res.status(500).json({ success: false, message: "Server error while creating the account" });
    }
  } else {
    return res.status(400).json({ success: false, message: "This method is not allowed" });
  }
}

export default connectDB(handler);
