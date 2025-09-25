import express from 'express'
import { getPendingApprovals,approveAttorney, rejectAttorney } from '../controllers/adminControllers.js'

const router = express.Router()

router.get("/approvals",getPendingApprovals)
router.patch("/approvals/:userId/approve",approveAttorney)
router.patch("/approvals/:userId/reject",rejectAttorney)


export default router