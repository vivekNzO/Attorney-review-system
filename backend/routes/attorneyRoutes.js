import express from 'express'
import { addClientToAttorney } from '../controllers/attorneyControllers.js'

const router = express.Router()

router.post("/add-client",addClientToAttorney)

export default router