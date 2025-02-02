import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        reportId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment