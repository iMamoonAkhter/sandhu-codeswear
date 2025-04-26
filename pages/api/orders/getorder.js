import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId } = req.body; // 📦 Get orderId from request body

    if (!orderId) {
      return res.status(400).json({ error: "Missing orderId in request body" });
    }

    // Find order by orderId
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Fetch order error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export default connectDB(handler);
