import express from "express";
import { createTaskController, deleteTaskController, obtenerTaskController, updateTaskController } from "../controller/taskController.js";

const taskRouther = express.Router();

taskRouther.post('/', createTaskController)
taskRouther.get('/:user_id', obtenerTaskController)
taskRouther.delete('/:task_id', deleteTaskController)
taskRouther.post('/:task_id', updateTaskController)
export default taskRouther