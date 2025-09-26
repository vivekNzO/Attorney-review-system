import express from 'express'
import { getAllClients, getClientInfo } from '../controllers/clientControllers.js'

const router = express.Router()

router.get("/",getAllClients)
router.get("/:id",getClientInfo)

export default router