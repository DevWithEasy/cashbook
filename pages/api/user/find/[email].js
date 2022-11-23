import initDatabase from "../../../../database/initDatabase";
import User from "../../../../database/model/User";

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
        res.status(200).json({
            success : true,
            status : 200,
            message : "User found",
            data : user
        })
    } catch (error) {
        console.log(error)
    }
}