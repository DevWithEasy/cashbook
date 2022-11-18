import Post from "../model/Post"


export const getEntryDetails= async(req,res)=>{
    try {
        const post = await  Post.findOne({"_id" : req.query.id})
        res.status(200).json({
            success: true,
            status: 200,
            data: post,
            message: "Entry updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}
export const updateEntry= async(req,res)=>{
    try {
        const post = await  Post.findOne({"_id" : req.query.id})
        const createHistory = {
            from : post.amount,
            to : parseInt(req.body.amount),
            reason: req.body.reason
        }
        await Post.updateOne({"_id" : req.query.id},{
            $set : {
                "amount" : req.body.amount,
                "entryType" : req.body.entryType,
                "remark" : req.body.remark
            },
            $push :{
                "history" : createHistory
            }
        })
        const newPost = await  Post.findOne({"_id" : req.query.id})

        res.status(200).json({
            success: true,
            status: 200,
            data: newPost,
            message: "Entry updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}

export const deleteEntry= async(req,res)=>{
    try {
        await Post.deleteOne({"_id" : req.query.id})
        res.status(200).json({
            success: true,
            status: 200,
            message: "Entry deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            success : false,
            status:500,
            message:err.message
        })
    }
}