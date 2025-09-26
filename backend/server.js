import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import initDB from './config/initDB.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/adminRoutes.js'
import { adminCheck, authCheck } from './middlewares/authMiddleware.js'
import attorneyRoutes from './routes/attorneyRoutes.js'
import swaggerRouter from './swagger/swagger.js'
import clientRoutes from './routes/clientRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/api-docs",swaggerRouter)

const PORT = process.env.PORT


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/admin",authCheck,adminCheck,adminRoutes)
app.use("/api/v1/attorney",authCheck,attorneyRoutes)
app.use("/api/v1/client",authCheck,clientRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on PORT `,PORT)
    initDB()
})