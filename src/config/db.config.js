import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.js";

const MONGO_URL = ENVIROMENT.MONGO_DB.MONGO_DB_CONNECTION_STR + '/' + ENVIROMENT.MONGO_DB.MONGO_DB_DATABASE

mongoose.connect(MONGO_URL, {})
.then(
    () => console.log('Database connection successful')
).catch( 
    (error) => {
    console.log('Database connection error', error)
})
export default mongoose