import express from "express"
import {postComment, getAllComments} from "../controllers/comment.controller.js"
import {protectRoutes} from "../middleware/protectRoutes.js"
const router = express.Router()

router.post("/post-comment/:reportId", protectRoutes, postComment)
router.get("/get-all-comments/:reportId", protectRoutes, getAllComments)

export default router