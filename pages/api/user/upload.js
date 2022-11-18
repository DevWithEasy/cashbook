import multer from "multer";
import nc from "next-connect";
import initDatabase from "../../../database/initDatabase";
import User from "../../../database/model/User";
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

export const config = {
    api : {
        bodyParser : false
    }
}

const storage = multer.diskStorage({})

const upload = multer({
    storage
})

const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  }).use(upload.single('image'))
    .post(async(req, res) => {
      try {
        await initDatabase()
        const user = await User.findOne({"_id" : req.body.id})
        if(user.image.public_id){
          await cloudinary.uploader.destroy(user.image.public_id)
        }
        const result = await cloudinary.uploader.upload(req.file.path,{
          folder: 'cashbook/users'
        })
        await User.updateOne({"_id" : req.body.id},{$set:{
          "image.public_id": result.public_id,
          "image.url": result.url
        }})
        const update = await User.findOne({"_id" : req.body.id})
        res.status(200).json({
          success: false,
          status : 200,
          data : update,
          message: "Profile photo successfully uploaded"
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          status : 500,
          message: error.message
        })
      }
    })
export default handler;