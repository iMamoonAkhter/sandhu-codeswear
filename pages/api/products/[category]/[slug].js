import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    const { category, slug } = req.query;

    if (!category || !slug) {
      return res.status(400).json({ error: "Both category and slug are required" });
    }

    const product = await Product.findOne({ category, slug });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDB(handler);
