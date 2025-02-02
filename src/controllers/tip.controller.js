import Tip from "../models/tips.model.js"

export const postTip = async (req, res) => {
    const {content} = req.body
    const {reportId} = req.params
    try {
        if(!content){
            return res.status(400).json({message: "Missing content!"})
        }
        const newTip = new Tip({
            reportId,
            content
        })
        await newTip.save()

        return res.status(200).json({message: "Tip created successfully!", data: newTip})
    } catch (error) {
        console.log("error with post tip controller", error)
        return res.status(500).json({messsage: "Internal server error"})
    }
}

export const getAllTips = async(req, res) => {
    const {reportId} = req.params
    try {
        const tips = await Tip.find({reportId})
        return res.status(200).json({message: "fetched all tips successfully", data: tips})
    } catch (error) {
        console.log("error with get all tips controller", error)
        return res.status(500).json("Internal server error")
    }
}