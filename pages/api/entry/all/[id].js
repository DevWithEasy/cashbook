import initDatabase from "../../../../database/initDatabase";
import Post from "../../../../database/model/Post";

export default async function handler(req, res){
    initDatabase()
    try{
        const posts = await Post.find({"book" : req.query.id}).sort({createdAt : -1})
        res.status(200).json({
            success : true,
            status:200,
            data : posts,
            message:"Successfully created"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}