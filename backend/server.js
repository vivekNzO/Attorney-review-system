import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import initDB from './config/initDB.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT
app.get("/",(req,res)=>{
    res.send("Hi")
})
app.use("/api/v1/auth",authRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on PORT `,PORT)
    initDB()
})