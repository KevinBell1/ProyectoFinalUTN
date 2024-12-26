import express from "express";
import taskRouther from "./routes/task.route.js";
import mongoose from "./config/db.config.js";
import authRouter from "./routes/auth.route.js";



const PORT = 3000
const app = express()

app.use(express.json())

app.use('/api/task', taskRouther)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))