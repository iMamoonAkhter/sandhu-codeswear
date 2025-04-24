import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
    if(req.method == 'POST'){
        const {firstName, lastName, email, phone, dob, gender, newsletter} = req.body;

        let u = new User({firstName, lastName, email, phone, dob, gender, newsletter, password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
        await u.save();
        res.status(200).json({success:true, message: "Account created successfully"});
    }else{
        res.status(400).json({success: false, message:"This method is not allowed"});
    }
}

export default connectDB(handler);