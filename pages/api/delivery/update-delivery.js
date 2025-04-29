import { connectDB } from "@/middleware/mongoose";
import { Delivery } from "@/models/DeliveryDetails";
import { User } from "@/models/User";

const updateDeliveryByEmail = async (req, res) => {
    if (req.method !== 'PUT') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed' 
      });
    }

    try {
      const { email, address, city, state, postalCode, country } = req.body;
  
      // Validate required fields
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is required' 
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
  
      // Find and update the delivery by email
      const updatedDelivery = await Delivery.findOneAndUpdate(
        { email }, // Find by email only
        { 
          address, 
          city, 
          state, 
          postalCode, 
          country,
          updatedAt: new Date() 
        },
        { 
          new: true, 
          runValidators: true,
          upsert: true // Create new if doesn't exist
        }
      );
  
      return res.status(200).json({
        success: true,
        message: 'Delivery updated successfully',
        data: updatedDelivery
      });
  
    } catch (error) {
      console.error('Error updating delivery:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
};

export default connectDB(updateDeliveryByEmail);