import initDatabase from "../../../../database/initDatabase";
import Book from "../../../../database/model/Book";

export default async function handler(req, res){
    initDatabase()
    try{
        const books = await Book.find({"user": req.query.id})

        res.status(200).json({
            success : "success",
            status:200,
            data : books
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}