import express from 'express'
import { handleLogin, handleLogout, handleProfile, handleSignup } from '../controllers/authControllers.js'

const router = express.Router()

router.post("/signup",handleSignup)
router.post("/login",handleLogin)
router.post("/logout",handleLogout)
router.get("/profile",handleProfile)

export default router