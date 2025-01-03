import ENVIROMENT from "../config/enviroment.js"
import ResponseBuilder from "../helpers/builders/response.builder.js"
import { verifyEmail, verifyMinLength, verifyString } from "../helpers/validation.helpers.js"
import User from "../models/user.model.js"
import bcrypt, { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporterEmail from '../helpers/builders/emailTransporter.js'

export const registerController = async (req, res) => {
    try{
        const {name, email, password} = req.body
    const registerConfig = {
        name: {
            value: name,
            errors: [],
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        password: {
            value: password,
            errors: [],
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        email: {
            value: email,
            errors: [],
            validation: [
                verifyEmail,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    let hayErrores = false
    for (let field_name in registerConfig){
        for(let validation of registerConfig[field_name].validation){
            let result = validation(field_name, registerConfig[field_name].value)
            if(result){
                hayErrores = true
                registerConfig[field_name].errors.push(result)
            }
        }
    }
    if(hayErrores){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(400)
        .setCode('VALIDATION_ERROR')
        .setData(
            {registerState: registerConfig}
        )
        return res.json(response)
    }

    const hashedPassword = await bcrypt.hash(registerConfig.password.value, 10)

    const validation_token = jwt.sign(
        {
            email: registerConfig.email.value
        },
        ENVIROMENT.SECRET_KEY,
        {
            expiresIn: '1d'
        }
)

    const redirectURL = `http://localhost:3000/api/auth/verify-email/` + validation_token 

    const result = await transporterEmail.sendMail({
        to: 'bellidos937@gmail.com',
        subject: 'Valida tu email',
        html: 
        `<h1>Validar email</h1>
        <p>Para validar tu email haz click <a href='${redirectURL}'>aqui</a> </p>
        `
    })

    console.log({result})

    const userCreated = new User({name: registerConfig.name.value , email: registerConfig.email.value, password: hashedPassword, verificationToken: ''}) 
    await userCreated.save()

    const response = new ResponseBuilder()
    .setCode('SUCCESS')
    .setOk(true)
    .setStatus(200)
    .setData(
        {registerResult: registerConfig}
    )
    .build()
    return res.json(response)
    }catch(error){
        if(error.code === 11000){
            const response = new ResponseBuilder()
            .setCode(error.code)
            .setOk(false)
            .setStatus(500)
            .setData(
                {message: 'El mail ya esta registrado'}
            )
            .build()
            return res.json(response)
        }
        const response = new ResponseBuilder()
        .setCode(error.code)
        .setOk(false)
        .setStatus(500)
        .setData({
            message: 'Error de catch' + error
        })
        .build()
        return res.json(response)
    }
}


export const verifyEmailController = async (req, res) => {
    try{
        const {validation_token} = req.params
        const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY)
        const email_to_verify = payload.email
        const user_to_verify = await User.findOne({email: email_to_verify})
        user_to_verify.emailVerified = true
        await user_to_verify.save()
        res.redirect('proyecto-final-utn-frontend-wheat.vercel.app/login')
        
    }catch(error){
        console.error(error)
    }
}

export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body  
    const user = await User.findOne({email: email})
    if(!user){
        return res.sendStatus(404)
    }
    const isCorresctPassword = await bcrypt.compare(password, user.password)
    if(!isCorresctPassword){
        return res.status(401).json({message: 'Contraseña incorrecta'})
    }
    if(!user.emailVerified){
        return res.sendStatus(403)
    }
    const access_token = jwt.sign(
        {
            user_id: user._id,
            name: user.name,
            email: user.email
        },
        ENVIROMENT.SECRET_KEY,
        {
            expiresIn: '1d'
        }
        
    )
    const response = new ResponseBuilder()
    .setOk(true)
    .setCode('LOGGED_SUCESS')
    .setMessage('Logged Sucess!')
    .setStatus(200)
    .setData({
        access_token: access_token,
        user_info: {
            user_id: user.id,
            name: user.name,
            email: user.email,
        }
    })
    .build();
return res.json(response)
    }catch(error){
        console.log(error)
    }
}   

