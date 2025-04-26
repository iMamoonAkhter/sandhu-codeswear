import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";

const handler = async (req, res)=>{
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({error: "Email is required"});
        }
        let orders = await Order.find({email: email});
        if(!orders){
            return res.status(404).json({error: "No orders found"});
        }
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}


export default connectDB(handler);
