import express from "express"
import {google, signIn, signUp} from "../controller/auth.controller.js";

const router = express.Router()

router.post('/sign-in',signIn )
router.post('/sign-up',signUp )
router.post('/google',google)

export default router