import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res) => {
    if(applyCors(req, res)) return;
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Find order by orderId
    const order = await Order.find({});
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
