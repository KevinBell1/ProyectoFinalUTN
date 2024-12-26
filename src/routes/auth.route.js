import express from 'express'
import {registerController, verifyEmailController} from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.get('/verify-email/:validation_token', verifyEmailController)

export default authRouter