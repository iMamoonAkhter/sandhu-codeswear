// controllers/deliveryController.js
import { connectDB } from '@/middleware/mongoose';
import { Delivery } from '../models/Delivery';
import { User } from '../models/User';

const postDelivery = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { email, address, city, state, postalCode, country } = req.body;

    // Validate required fields
    if (!email || !address || !city || !state || !postalCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Verify email exists in User collection
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User with this email not found' 
      });
    }

    // Create new delivery
    const delivery = new Delivery({
      user: user._id,
      email,
      address,
      city,
      state,
      postalCode,
      country: country || 'Pakistan' // Default to Nigeria if not provided
    });

    // Save delivery to database
    await delivery.save();

    return res.status(201).json({
      success: true,
      message: 'Delivery information saved successfully',
      data: delivery
    });

  } catch (error) {
    console.error('Error saving delivery:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export default connectDB(postDelivery)