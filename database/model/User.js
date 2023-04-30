import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    image:{
        public_id :{
            type:String
        },
        url :{
            type:String
        }
    },
    isVerified :{
        type:Boolean,
        default : false
    },
    isFromGoogle :{
        type:Boolean,
        default : false
    },
    books : [
        {
            type:mongoose.Types.ObjectId,
            ref:'Book'
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User',userSchema)
export default User;