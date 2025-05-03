import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";
import { applyCors } from "@/lib/cors";

const handler = async (req, res)=>{
    if(applyCors(req, res)) return;
    const category = req.query.category;

    if(!category){
        return res.status(400).json({error: "Category is required"});
    }
    let products = await Product.find({category: category});
    res.status(200).json({products});
}


export default connectDB(handler);
