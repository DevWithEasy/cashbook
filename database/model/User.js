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
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
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
    }
})

const User = mongoose.models.User || mongoose.model('User',userSchema)
export default User;