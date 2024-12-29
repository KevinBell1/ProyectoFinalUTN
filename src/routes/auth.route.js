import express from 'express'
import {registerController, } from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.get('/verify-email/:validation_token', )

export default authRouter