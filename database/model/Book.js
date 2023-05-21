import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Book = mongoose.models.Book || mongoose.model('Book',bookSchema)
export default Book