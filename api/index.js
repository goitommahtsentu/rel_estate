import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
// import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
const app= express();
dotenv.config()
app.use(express.json())
mongoose.connect(process.env.MONG_URL).then(()=>{
   console.log('connected to Db')
}).catch((err)=>{
   console.log(err)
})
app.listen(3000,(req,res)=>{
   console.log('test')
})
// app.use('/api/user',userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";


    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
