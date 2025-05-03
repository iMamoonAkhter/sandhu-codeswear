// controllers/deliveryController.js

import { applyCors } from "@/lib/cors";
import { connectDB } from "@/middleware/mongoose";
import { Delivery } from "@/models/DeliveryDetails";

const getAllDelivery = async (req, res) => {
    if(applyCors(req, res)) return;
  try {
    

    // Find all deliveries for this user
    const deliveries = await Delivery.find()

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

export default connectDB(getAllDelivery)
