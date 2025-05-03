import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res) => {
  if(applyCors(req, res)) return;
  if (req.method === "POST") {
    try {
      for (let i = 0; i < req.body.length; i++) {
        const item = req.body[i];

        // Check if product with the same slug exists
        const existingProduct = await Product.findOne({ slug: item.slug });
        if (existingProduct) {
            res.status(500).json({ success: false, error: `Product ${item.slug} already exist` });
        }

        const p = new Product({
          title: item.title,
          slug: item.slug,
          desc: item.desc,
          img: item.img,
          category: item.category,
          size: item.size,
          color: item.color,
          price: item.price,
          availableQty: item.availableQty,
        });

        await p.save();
      }

      res.status(200).json({ success: true, message: "Products processed successfully" });
    } catch (error) {
      console.error("Error saving products:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
