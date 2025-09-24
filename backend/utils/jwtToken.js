import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = (user,res)=>{
    const token = jwt.sign({id:user.id,email:user.email,roleId:user.roleId},process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
    res.cookie("jwt",token,{
        maxAge:3*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict"
    })
    return token
}