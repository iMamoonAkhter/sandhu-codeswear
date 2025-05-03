import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res) => {
  if(applyCors(req, res)) return;
  if (req.method === "PUT") {
    try {
      for (let i = 0; i < req.body.length; i++) {
        const item = req.body[i];
        if(!item._id) {
          return res.status(400).json({ success: false, error: "Product ID is required" });
        }
        let p = await Product.findByIdAndUpdate(item._id, item)
      }

      res.status(200).json({ success: true, message: "Products updated successfully" });
    } catch (error) {
      console.error("Error saving products:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
