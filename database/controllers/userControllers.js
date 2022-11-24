import bcrypt from 'bcrypt';
import User from "../model/User";
import jwt from 'jsonwebtoken';

export const signin = async(req,res)=>{
    try{
        
        const {email} = req.body
        const findUser = await User.findOne({email : email})

        if(!findUser){
            res.status(404).json({
                success : "failed",
                status:404,
                message:"User not found"
            })
        }
        const valid = await bcrypt.compare(req.body.password,findUser.password)
        if(!valid){
            res.status(404).json({
                success : "failed",
                status:404,
                message:"Credentials not valid"
            })
        }
        //generate access token
        const token = await jwt.sign({id : findUser._id},process.env.JWT_SECRET)
        
        const {password,...others} = findUser
        res.status(200).json({
            success : "success",
            status:200,
            data : others._doc,
            message:"Successfully signin",
            token
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const updateUser = async(req,res)=>{
    try{
        const {name,email,number} = req.body

        await User.updateOne({"email": email},{$set:{
            name : name,
            email : email,
            number : number
        }})
        const findUser = await User.findOne({"email" : email})
        res.status(200).json({
            success : "success",
            status:200,
            data : findUser,
            message:"Successfully updated"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}