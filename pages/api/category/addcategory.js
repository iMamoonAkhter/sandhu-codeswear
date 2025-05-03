import { Category } from "@/models/Category";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res) => {
    if (applyCors(req, res)) return;
  if (req.method === "POST") {
    try {
      const item = req.body;

      // Check if product with the same slug exists
      const existingCategory = await Category.findOne({
        category: item.category,
      });
      if (existingCategory) {
        res
          .status(500)
          .json({
            success: false,
            error: `Category ${item.category} already exist`,
          });
      } else {
        const p = new Category({
          category: item.category,
        });

        await p.save();

        res
          .status(200)
          .json({ success: true, message: "Category processed successfully" });
      }
    } catch (error) {
      console.error("Error saving category:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
