import express from 'express'
import {loginController, registerController, verifyEmailController, } from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.get('/verify-email/:validation_token', verifyEmailController )
authRouter.post('/login', loginController)

export default authRouter