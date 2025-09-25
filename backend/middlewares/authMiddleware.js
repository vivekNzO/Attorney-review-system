import dotenv from 'dotenv'
import prisma from '../config/prismaClient.js'
import jwt from 'jsonwebtoken'
dotenv.config()

export const authCheck = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token)return res.status(401).json({message:"Not authenticated"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where : {id:decoded.id},
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                role:{select:{id:true,roleName:true}}
            }
        })

        if(!user)return res.status(404).json({message:"User not found"})
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Invalid token"})
    }
}

export const adminCheck = async(req,res,next)=>{
    try {
        if(req.user.role.roleName!=='Admin'){
            return res.status(403).json({message:"Access denied : Admins only"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Internal server error"})
    }
}

export const attorneyCheck=async(req,res,next)=>{
    try {
        const userId = req.user.id
        if(!userId)return res.status(401).json({message:"Unauthorized"})
        
        const attorney = await prisma.attorney.findUnique({
            where:{userId}
        })
        if(!attorney)return res.status(403).json({message:"Not an attorney"})
        req.user.attorney = attorney
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}