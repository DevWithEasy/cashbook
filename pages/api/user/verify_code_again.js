import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Verification from "../../../database/model/Veification";
import { sendVerificaion } from "../../../libs/varification";
import authentication from "../../../utils/authentication";

async function handler(req, res){
    initDatabase()
    try {
        if(!req.user) return res.status(403).json({
                success : false,
                status : 403,
                message : "Token is not valid."
            })

        const user = await User.findOne({"_id" : req.user.id})

        if(!user) return res.status(404).json({
            success : false,
            status : 403,
            message : "User not found."
        })
        //generate random number
        const randomNumber = Math.ceil(Math.random()*999999)
        const code = await bcrypt.hash((randomNumber).toString(),10)

        const findCode = await Verification.findOne({"user": req.user.id})

        if(!findCode){
            const verify = new Verification({
                user : user._id,
                code : code
            })
            await verify.save()
            sendVerificaion(process.env.EMAIL,user.email,user.name,randomNumber)
        }else{
            await Verification.updateOne({"user": req.user.id},{$set:{
                code : code,
                expired : Date.now() + 21600000
            }})
            sendVerificaion(process.env.EMAIL,user.email,user.name,randomNumber)
        }

        res.status(200).json({
            success : true,
            status : 200,
            message : "Verification code sent again"
        })
    } catch (error) {
        console.log(error.message)
    }
}
export default authentication(handler);