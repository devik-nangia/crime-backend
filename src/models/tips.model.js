import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
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

const Tip = mongoose.model('Tip', tipSchema)

export default Tip