import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res,next) => {
    const {username, email, password} = req.body;
    try {
        const hashPassword= bcrypt.hashSync(password,10)
        const newUser =new User(
            {
                username,email,password:hashPassword
            }
        )
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch (error){
        next(errorHandler(500,"please file the form"))
    }
}
export const signIn = async (req, res,next) => {
    const {email,password}=req.body
    try {
        const validUser= await User.findOne({email})
        if (!validUser){
            return next(errorHandler(404,"user not found"))
        }
        const comparePass = await bcrypt.compareSync(password,validUser.password)
        if(!comparePass){
            return  next(errorHandler(404,"invalid password"))
        }
        const {password:pass,...rest}=validUser._doc
    const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY)
          res.cookie('access_token',token,{
              httpOnly:true,
          }).status(200).json(rest)
    }
    catch (error){
        next(error)
    }
}