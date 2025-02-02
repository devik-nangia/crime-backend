import express from "express"
import {postTip, getAllTips} from "../controllers/tip.controller.js"
import {protectRoutes} from "../middleware/protectRoutes.js"
const router = express.Router()

router.post("/post-tip/:reportId", protectRoutes, postTip)
router.get("/get-all-tips/:reportId", protectRoutes, getAllTips)

export default router