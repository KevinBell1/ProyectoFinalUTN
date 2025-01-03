import express from "express";
import taskRouther from "./routes/task.route.js";
import mongoose from "./config/db.config.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";


const PORT = 3000
const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    ENVIROMENT.FRONTEND_URL
]
app.use((req, res, nect) => {
    const origin = req.headers.origin
    if(allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    nect()
})

app.use(express.json())
app.use(cors())

app.use('/api/task', taskRouther)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))