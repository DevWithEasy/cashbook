import initDatabase from "../../../../database/initDatabase";
import User from "../../../../database/model/User";
import bcrypt from "bcrypt";
import Verification from "../../../../database/model/Veification";
import { sendForgetPassword } from "../../../../libs/varification";

export default async function handler(req, res){
    initDatabase()
    try {
        const {email} = req.query
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({
            success : false,
            status : 404,
            message : "User not found"
        })
        //generate random number
        const randomNumber = Math.ceil(Math.random()*999999)
        const code = await bcrypt.hash((randomNumber).toString(),10)

        const findCode = await Verification.findOne({"user": user._id})

        if(!findCode){
            const verify = new Verification({
                user : user._id,
                code : code
            })
            await verify.save()
            sendForgetPassword(process.env.EMAIL,user.email,user.name,randomNumber)
        }else{
            await Verification.updateOne({"user": user._id},{$set:{
                code : code,
                expired : Date.now() + 21600000
            }})
            sendForgetPassword(process.env.EMAIL,user.email,user.name,randomNumber)
        }
        res.status(200).json({
            success : true,
            status : 200,
            message : "Verification code sent successfully",
        })
    } catch (error) {
        console.log(error)
    }
}