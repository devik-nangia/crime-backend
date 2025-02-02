import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        crimeCategory:{
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        radius: {
            type: Number,
        },
        dateOfCrime: {
            type: Date
        },
        time: {
            type: String
        },
        media: {
            type: String,
        },
        isCaseClosed: {
            type: Boolean,
            default: false,
        },
        markedTrueAmount: {
            type: Number,
            default: 0
        },
        markedFalseAmount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Report = mongoose.model('Report', reportSchema)

export default Report