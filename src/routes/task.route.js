import express from "express";
import { createTaskController } from "../controller/taskController.js";

const taskRouther = express.Router();

taskRouther.post('/', createTaskController)

export default taskRouther