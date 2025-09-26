import express, { Router } from 'express'
import { addClientReview, addClientToAttorney, getAllAttorneys, getAttorneyInfo } from '../controllers/attorneyControllers.js'
import { attorneyCheck } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/add-client",attorneyCheck,addClientToAttorney)
router.post("/review/:clientId",attorneyCheck,addClientReview)
router.get("/:attorneyId",getAttorneyInfo)
router.get("/",getAllAttorneys)

export default router