import { Order } from "@/models/Order";
import { connectDB } from "@/middleware/mongoose";

const handler = async (req, res)=>{
    try {
        const {id} = req.body;
        console.log(id)
        if(!id){
            return res.status(400).json({error: "User not found"});
        }
        let orders = await Order.find({user: id});
        if(!orders){
            return res.status(404).json({error: "No orders found"});
        }
        res.status(200).json({orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}


export default connectDB(handler);
