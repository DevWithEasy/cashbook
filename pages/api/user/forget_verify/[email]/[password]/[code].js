import bcrypt from "bcrypt";
import initDatabase from "../../../../../../database/initDatabase";
import User from "../../../../../../database/model/User";
import Verification from "../../../../../../database/model/Veification";
import { sendSuccessful } from "../../../../../../libs/varification";

export default async function handler(req, res){
    initDatabase()
    try {
        const {email,code,password} = req.query
        const user = await User.findOne({"email" : email})

        if(!user) return res.status(403).json({
                success : false,
                status : 403,
                message : "User not found."
            })

        const findCode = await Verification.findOne({"user": user._id})
        if(!findCode) return res.status(404).json({
            success : false,
            status : 404,
            message : "Code not found.Sent again"
        })

        if(findCode.expired < Date.now()) return res.status(201).json({
            success : false,
            status : 201,
            message : "Code expired.Sent again"
        })

        const isvalid = await bcrypt.compare(code,findCode.code)
        if(!isvalid) return res.status(403).json({
            success : false,
            status : 403,
            message : "Invalid or Wrong Code"
        })

        const hashed = await bcrypt.hash(password,10)

        await User.updateOne({"_id": user._id},{$set:{
            password : hashed
        }})

        await Verification.deleteOne({"_id" : findCode._id})

        sendSuccessful(process.env.EMAIL,user.email,user.name)
        
        res.status(200).json({
            success : true,
            status : 200,
            message : "Password Changed successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
}