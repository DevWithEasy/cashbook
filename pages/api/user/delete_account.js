import authentication from "../../../utils/authentication";
import User from "../../../database/model/User";
import Book from "../../../database/model/Book";
import Post from "../../../database/model/Post";
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

async function handler(req, res){
    try {
        const id = req.user.id
        if(!req.user) return res.status(403).json({
            success : false,
            status : 403,
            message : "Token is not valid."
        })
        const user = await User.findOne({"_id" : id})
        if(user.image.public_id){
            await cloudinary.uploader.destroy(user.image.public_id)
        }
        await User.deleteOne({"_id" : id})
        await Book.deleteMany({"user" : id})
        await Post.deleteMany({"user" : id})
        res.status(200).json({
            success : true,
            status : 200,
            message : 'Account deleted successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
export default authentication(handler)