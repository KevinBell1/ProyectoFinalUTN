import ENVIROMENT from "../config/enviroment.js"
import transporterEmail from "../helpers/builders/emailTransporter.js"
import ResponseBuilder from "../helpers/builders/response.builder.js"
import { verifyEmail, verifyMinLength, verifyString } from "../helpers/validation.helpers.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


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
    const validation_token = jsonwebtoken.sign({
        email: registerConfig.email.value
    },
    ENVIROMENT.SECRET_KEY,
    {
        expiresIn: '1d'
    }
    
    )

    const redirectUrl = `${ENVIROMENT.URL_FRONTEND}/api/auth/verify-email/` + validation_token

    const result = await transporterEmail.sendMail({
        subject: 'Valida tu email',
        to: registerConfig.email.value,
        html: `
        <h1>Valida tu mail</h1>
        <p>Para validar tu mail haz click en <a href= "${redirectUrl}">Este enlace</a></p>
        `
    })


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

export const verifyEmailController = async (req, res) =>{
    try{
        const {validation_token} = req.params
        const payload = jsonwebtoken.verify(validation_token, ENVIROMENT.SECRET_KEY) // le poasamos el token y la clave, esto verifica si la firma es nuestra y no esta expirado
        const email_to_verify = payload.email
        const user_to_verify = await User.findOne({email: email_to_verify})
        user_to_verify.emailVerified = true
        await user_to_verify.save()
        res.json({message: 'Email verificado'})
        /* redirect, al front end */
    }catch(error){
        console.error(error)
    }
}
