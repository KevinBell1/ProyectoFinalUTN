import dotenv from "dotenv";

dotenv.config()

const ENVIROMENT = {
    MONGO_DB: {
        MONGO_DB_CONNECTION_STR : process.env.MONGO_DB_CONNECTION_STR,
        MONGO_DB_DATABASE : process.env.MONGO_DB_DATABASE
    },
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USER: process.env.EMAIL_USER,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL :process.env.BACKEND_URL,
    SECRET_KEY : process.env.SECRET_KEY,
}

export default ENVIROMENT