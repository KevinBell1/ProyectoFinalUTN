import dotenv from "dotenv";

dotenv.config()

const ENVIROMENT = {
    MONGO_DB: {
        MONGO_DB_CONNECTION_STR : process.env.MONGO_DB_CONNECTION_STR,
        MONGO_DB_DATABASE : process.env.MONGO_DB_DATABASE
    }
}

export default ENVIROMENT