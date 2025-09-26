import express, { Router } from 'express'
import { addClientReview, addClientToAttorney, getAllAttorneys, getAttorneyInfo, getClientsUnderAttorney } from '../controllers/attorneyControllers.js'
import { attorneyCheck } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/add-client",attorneyCheck,addClientToAttorney)
router.post("/review/:clientId",attorneyCheck,addClientReview)
router.get("/:attorneyId/info",getAttorneyInfo)
router.get("/",getAllAttorneys)

router.get("/clients",attorneyCheck,getClientsUnderAttorney)

export default router