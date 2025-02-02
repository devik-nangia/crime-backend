import express from "express"
import {getAllReports, getReport, markCaseClosed, postReport, markedTrueIncrease, markedFalseIncrease} from "../controllers/report.controllers.js"
import {protectRoutes} from "../middleware/protectRoutes.js"

const router = express.Router()

router.get('/get-all-reports', protectRoutes, getAllReports)
router.get('/:reportId', protectRoutes, getReport)
router.post('/post-report',protectRoutes, postReport)

router.patch('/mark-case-closed/:reportId', protectRoutes, markCaseClosed)
router.patch('/marked-true-increase/:reportId', protectRoutes, markedTrueIncrease)
router.patch('/marked-false-increase/:reportId', protectRoutes, markedFalseIncrease)

export default router