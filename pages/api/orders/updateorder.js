import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res) => {
  if(applyCors(req, res)) return;
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, status } = req.body; // ✅ Only taking orderId and status

    if (!orderId || !status) {
      return res.status(400).json({ error: "Missing orderId or status" });
    }

    const allowedStatuses = [
      "Pending",
      "Order Placed",
      "Payment Processed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Only update status
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export default connectDB(handler);
