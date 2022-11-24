import bcrypt from "bcrypt";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
import Verification from "../../../database/model/Veification";
import { sendSuccessful } from "../../../libs/varification";
import authentication from "../../../utils/authentication";

async function handler(req, res){
    initDatabase()
    try {
        if(!req.user) return res.status(403).json({
                success : false,
                status : 403,
                message : "Token is not valid."
            })

        const code = await Verification.findOne({"user": req.user.id})
        if(!code) return res.status(404).json({
            success : false,
            status : 404,
            message : "Code not found."
        })

        if(code.expired < Date.now()) return res.status(201).json({
            success : false,
            status : 201,
            message : "Code expired"
        })

        const isvalid = await bcrypt.compare(req.body.code,code.code)
        if(!isvalid) return res.status(403).json({
            success : false,
            status : 403,
            message : "Invalid or Wrong Code"
        })

        await User.updateOne({"_id": req.user.id},{$set:{
            isVerified : true
        }})

        await Verification.deleteOne({"_id" : code._id})

        const user = await User.findOne({"_id" : req.user.id})

        sendSuccessful(process.env.EMAIL,user.email,user.name)
        
        res.status(200).json({
            success : true,
            status : 200,
            message : "Account successfully verified"
        })
    } catch (error) {
        console.log(error.message)
    }
}
export default authentication(handler);