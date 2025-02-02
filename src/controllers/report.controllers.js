import Report from "../models/report.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({})
        return res.status(200).json({
            message: "fetched reports successfully",
            data: reports
        })
    } catch (error) {
        res.status(500).send("error with get all reports controller", error)
    }
}

export const getReport = async (req, res) => {
    const { reportId } = req.params
    try {
        console.log(reportId)
        const report = await Report.findById(reportId)
        return res.status(200).json({
            message: "fetched report successfully",
            data: report
        })
    } catch (error) {
        return res.status(500).send("error with get get report controller", error)
    }
}

export const postReport = async (req, res) => {
    const { crimeCategory, summary, description, location, radius, media, dateOfCrime, time } = req.body
    const user = req.user
    try {
        if (!crimeCategory || !summary || !description || !location) {
            return res.status(400).json({ message: "must fill all necessary blanks" })
        }
        let mediaUrl;
        if (media) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            mediaUrl = uploadResponse.secure_url;
        }

        const newReport = new Report({
            userId: user._id,
            crimeCategory,
            summary,
            description,
            location,
            radius,
            dateOfCrime,
            time,
            media
        })

        await newReport.save()

        return res.status(200).json(newReport)
        //console.log(user)
    } catch (error) {
        return res.status(500).send("error with get post report controller", error)
    }
}

export const markCaseClosed = async (req, res) => {
    const { isCaseClosed } = req.body
    const { reportId } = req.params
    try {
        const report = await Report.findByIdAndUpdate(reportId, {
            isCaseClosed
        }, { new: true })

        return res.status(200).json({message: "updated successfully", 
            data: report
        })
    } catch (error) {
        return res.status(500).send("error with get mark case closed", error)
    }
}

export const markedTrueIncrease = async (req, res) => {
    const {reportId} = req.params
    try {
        const {markedTrueAmount: amount} = await Report.findById(reportId)

        const newReport = await Report.findByIdAndUpdate(reportId,
            {markedTrueAmount: amount + 1},
            {new: true}
        )

        return res.status(200).json({message: "increased mark true amount successfully",
            data: newReport
        })
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

export const markedFalseIncrease = async (req, res) => {
    const {reportId} = req.params
    try {
        const {markedFalseAmount: amount} = await Report.findById(reportId)

        const newReport = await Report.findByIdAndUpdate(reportId,
            {markedFalseAmount: amount + 1},
            {new: true}
        )

        return res.status(200).json({message: "increased mark false amount successfully",
            data: newReport
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}
