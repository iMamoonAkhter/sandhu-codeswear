// controllers/deliveryController.js

import { connectDB } from "@/middleware/mongoose";
import { Delivery } from "@/models/DeliveryDetails";
import { User } from "@/models/User";


const getDeliveriesByEmail = async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body

    // Validate required field
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required in the request body' 
      });
    }

    // Verify email format
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Find all deliveries for this user
    const deliveries = await Delivery.find({ email })

    return res.status(200).json({
      success: true,
      count: deliveries.length,
      data: deliveries
    });

  } catch (error) {
    console.error('Error fetching deliveries:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default connectDB(getDeliveriesByEmail)
