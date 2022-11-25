import initDatabase from "../../../../database/initDatabase";
import User from "../../../../database/model/User";
import jwt from "jsonwebtoken"

export default async function handler(req, res){
    initDatabase()
    try {
        const user = await User.findOne({"email": req.body.email})
        if(user){
            const {password,...others} = user
            //generate access token
            const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)
            res.status(200).json({
                success : "success",
                status:200,
                data : others._doc,
                message:"Successfully signin",
                token
            })
        }else{
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                number : "",
                isVerified : true,
                isFromGoogle : true,
                image:{
                    public_id : "",
                    url : req.body.url
                }
            })
            const user = await newUser.save()
            const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)
            const {password,...others} = user
            res.status(200).json({
                success : "success",
                status:200,
                data : others._doc,
                message:"Successfully signin",
                token
            })
        }
    } catch (error) {
        res.status(500).json({
            success : "fail",
            status:500,
            message:error.message,
        })
    }
}