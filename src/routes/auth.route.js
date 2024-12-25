import express from 'express'
import {registerController} from '../controller/authController.js'

const authRouther = express.Router()

authRouther.post('/register', registerController)

export default authRouther