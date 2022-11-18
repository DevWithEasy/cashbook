import bcrypt from 'bcrypt';
import initDatabase from "../../../../database/initDatabase";
import User from "../../../../database/model/User";

export default async function handler(req, res){
    initDatabase()
    try{
        const {email} = req.body
        const findUser = await User.findOne({email: email})
        
        if(findUser){
            res.status(405).json({
                success : "failed",
                status:405,
                message:"User already exists"
            })
        }
        const hashed = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            ...req.body,
            password : hashed,
            isVerified : false,
            isFromGoogle : false
        })
        newUser.save()
        res.status(200).json({
            success : "success",
            status:200,
            message:"Successfully signup"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}