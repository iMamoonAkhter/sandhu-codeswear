import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res)=>{
    if(applyCors(req, res)) return;
    let products = await Product.find({});
    res.status(200).json({products});
}


export default connectDB(handler);
