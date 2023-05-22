import initDatabase from "../../../../database/initDatabase";
import Book from "../../../../database/model/Book";
import Post from "../../../../database/model/Post";
import authentication from "../../../../utils/authentication";

async function handler(req, res){
    initDatabase()
    try{
        const book = await Book.findById(req.body.book)
        console.log(book)
        if(!book){
            return res.status(404).json({
                success : false,
                status:404,
                message:'Book not found'
            })
        }

        const newPost= new Post({
            ...req.body,
            user : req.user.id
        })
        const post = await newPost.save()
        
        res.status(200).json({
            success : true,
            status:200,
            data : post,
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

export default authentication(handler)