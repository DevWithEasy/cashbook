import initDatabase from "../../../../database/initDatabase";
import Book from "../../../../database/model/Book";
import User from "../../../../database/model/User";
import authentication from "../../../../utils/authentication";

async function handler(req, res){
    initDatabase()
    try{
        console.log({
            ...req.body,user : req.user
        })
        const newBook = new Book({
            ...req.body,
            user : req.user.id
        })
        const book = await newBook.save()
        await User.findByIdAndUpdate(req.user.id,{$push : {books : book._id}})
        res.status(200).json({
            success : "success",
            status:200,
            data : book,
            message:"Successfully Created"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}
export default authentication(handler);