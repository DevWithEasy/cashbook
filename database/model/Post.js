import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    book:{
        type:mongoose.Types.ObjectId,
        required:"Book"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    amount :{
        type : Number,
        required :true
    },
    remark : {
        type : String,
        required :true
    },
    entryType :{
        type : String,
        enum : ["Credit","Debit"]
    },
    history : [
        {
            from : {
                type : Number,
                required :true
            },
            to : {
                type : Number,
                required : true
            },
            reason : {
                type : String,
            },
            date : {
                type : Date,
                default : Date.now()
            }

        }
    ]

},{
    timestamps:true
})

const Post = mongoose.models.Post || mongoose.model('Post',postSchema)
export default Post