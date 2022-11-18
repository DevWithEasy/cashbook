import initDatabase from "../../../../database/initDatabase";
import Book from "../../../../database/model/Book";

export default async function handler(req, res){
    initDatabase()
    try{
        const newBook = new Book({
            ...req.body
        })
        const book = await newBook.save()
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