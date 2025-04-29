import { connectDB } from "@/middleware/mongoose";
import { Delivery } from "@/models/DeliveryDetails";
import { User } from "@/models/User";

// controllers/deliveryController.js
const deleteDelivery = async (req, res) => {
    try {
      const { email, deliveryId } = req.body;
  
      // Validate required fields
      if (!email || !deliveryId) {
        return res.status(400).json({
          success: false,
          message: 'Both email and delivery ID are required'
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
  
      // Find and delete the delivery
      const deletedDelivery = await Delivery.findOneAndDelete({
        _id: deliveryId,
        email: email // Ensures the delivery belongs to this user
      });
  
      if (!deletedDelivery) {
        return res.status(404).json({
          success: false,
          message: 'Delivery not found or does not belong to this user'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Delivery deleted successfully',
        data: deletedDelivery
      });
  
    } catch (error) {
      console.error('Error deleting delivery:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

  export default connectDB(deleteDelivery)