import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
    if(req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email, });
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        
        if(user){
            if(req.body.email == user.email && decryptPass == req.body.password){
                res.status(200).json({success:true, user: user, message: "Login successful"});
            }
            else{
                res.status(400).json({success: false, message:"Invalid credentials"});
            }
        }
        else{
            res.status(400).json({success: false, message:"User not found"});
        }
        
    }else{
        res.status(400).json({success: false, message:"This method is not allowed"});
    }
}

export default connectDB(handler);