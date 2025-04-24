import { connectDB } from "@/middleware/mongoose";
import { User } from "@/models/User";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    if(req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email, });
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        
        if(user){
            if(req.body.email == user.email && decryptPass == req.body.password){
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '1d' // expires in 24 hours
                });
                res.status(200).json({success:true, token: token, message: "Login successful"});
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