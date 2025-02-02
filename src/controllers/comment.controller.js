import Comment from "../models/comment.model.js"

export const postComment = async (req, res) => {
    const {content} = req.body
    const {reportId} = req.params
    try {
        if(!content){
            return res.status(400).json({message: "Missing content!"})
        }
        const newComment = new Comment({
            reportId,
            content
        })
        await newComment.save()

        return res.status(200).json({message: "Comment created successfully!", data: newComment})
    } catch (error) {
        console.log("error with post comment controller", error)
        return res.status(500).json({messsage: "Internal server error"})
    }
}

export const getAllComments = async(req, res) => {
    const {reportId} = req.params
    try {
        const comments = await Comment.find({reportId})
        return res.status(200).json({message: "fetched all comments successfully", data: comments})
    } catch (error) {
        console.log("error with get all comments controller", error)
        return res.status(500).json("Internal server error")
    }
}