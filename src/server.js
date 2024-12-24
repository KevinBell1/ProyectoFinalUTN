import express from "express";
import taskRouther from "./routes/task.route.js";
import mongoose from "./config/db.config.js";

const PORT = 3000
const app = express()

app.use(express.json())

app.use('/api/task', taskRouther)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))