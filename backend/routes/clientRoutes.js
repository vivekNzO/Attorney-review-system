import express from 'express'
import { getAllClients, getClientInfo } from '../controllers/clientControllers.js'

const router = express.Router()

router.get("/",getAllClients)
router.get("/:userId",getClientInfo)

export default router