import express from 'express'
import { getPendingApprovals,approveAttorney, rejectAttorney } from '../controllers/adminControllers.js'

const router = express.Router()

router.get("/approvals",getPendingApprovals)
router.put("/approvals/:userId/approve",approveAttorney)
router.put("/approvals/:userId/reject",rejectAttorney)


export default router