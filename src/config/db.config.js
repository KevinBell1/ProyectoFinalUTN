import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://admin:xzMNHwckiSzYZ7T@cluster0.907t1.mongodb.net/DATA_BASE_FINAL_PROYECT';

mongoose.connect(MONGO_URL, {})
.then(
    () => console.log('Database connection successful')
).catch( 
    (error) => {
    console.log('Database connection error', error)
})
export default mongoose