import { Product } from "@/models/Product";
import { connectDB } from "@/middleware/mongoose";

const handler = async (req, res)=>{
    const category = req.query.category;

    if(!category){
        return res.status(400).json({error: "Category is required"});
    }
    console.log(category);
    let products = await Product.find({category: category});
    res.status(200).json({products});
}


export default connectDB(handler);
