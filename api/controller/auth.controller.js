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
export const google = async (req, res, next) => {
    try {
        console.log("Google sign-in request received");
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        next(error);
    }
};
