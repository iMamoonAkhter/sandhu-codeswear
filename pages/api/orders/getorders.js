import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { connectDB } from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure JWT_SECRET is set in your .env
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const email = user.email;
    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }
    

    let orders = await Order.find({ email: email });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json({ orders });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDB(handler);
