import ResponseBuilder from "../helpers/builders/response.builder.js"
import { verifyEmail, verifyMinLength, verifyString } from "../helpers/validation.helpers.js"


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

    const userCreated = new User({name: registerConfig.name.value , email: registerConfig.email.value, password: hashedPassword, verificationToken: ''}) 
    await userCreated.save()

    const response = new ResponseBuilder()
    .setCode('SUCCES')
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
        .setData(
            error.message
        )
        .build()
        return res.json(response)
    }
}

