import bcrypt from 'bcrypt';
import initDatabase from "../../../../database/initDatabase";
import User from "../../../../database/model/User";
import Verification from '../../../../database/model/Veification';
import { sendVerificaion } from '../../../../libs/varification';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    initDatabase()
    try{
        const {email} = req.body

        //find exists userEmail
        const findUser = await User.findOne({email: email})
        
        if(findUser) return res.status(405).json({
                success : "failed",
                status:405,
                message:"User already exists"
            })
        

        //generate hash password
        const hashed = await bcrypt.hash(req.body.password,10)

        //generate random number
        const randomNumber = Math.ceil(Math.random()*999999)
        const code = await bcrypt.hash((randomNumber).toString(),10)

        //create user
        const newUser = new User({
            ...req.body,
            password : hashed,
            isVerified : false,
            isFromGoogle : false
        })

        const user = await newUser.save()
        const verify = new Verification({
            user : user._id,
            code : code
        })

        await verify.save()

        sendVerificaion(process.env.EMAIL,user.email,user.name,randomNumber)

        //generate access token
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        res.status(200).json({
            success : "success",
            status:200,
            message:"Successfully signup",
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