
import { applyCors } from "@/lib/cors";
import { connectDB } from "@/middleware/mongoose";
import { Category } from "@/models/Category";

const handler = async (req, res) => {
    if(applyCors(req, res)) return;
   let category = await Category.find({});
    res.status(200).json({category});
};

export default connectDB(handler);
