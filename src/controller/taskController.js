import { errorHandler } from "../../middleware/errorHandlerMiddelware.js"
import taskRepository from "../repositories/task.repository.js"


export const createTaskController = async (req, res) => {

        const {task} = req.body

    if(!task) {
        return res.status(400).json({
        ok: false,
        code: 'INVALID_TASK',
        message: 'El dato de la tarea es requerido',
    })
}
    try{
    const newTask = await taskRepository.createTask({task})
    return res.status(201).json({
        task: newTask.task,  
        active: newTask.active, 
        _id: newTask._id,  // devuelve el _id para el frontend, IMPORTANTE
    })
    }catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                code: 'DB_VALIDATION_ERROR',
                message: 'Error de validación en la base de datos',
                details: error.message,
            });
        }
        return res.status(500).json({
            ok: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error al crear la tarea', error
        })
    }
}

export const obtenerTaskController = async (req, res) => {
    try{
        const {user_id} = req.params
        const tasksList = await taskRepository.obtenerTasks(user_id)
        res.status(200).json(tasksList)
    }catch (error) {
        errorHandler(res, error, 'Error al obtener tareas');
    }
    
}

export const deleteTaskController = async (req, res) => {
    try{
        const {task_id} = req.params
        if (!task_id) {
            return res.status(404).json({ message: "No se ha encontrado el id del producto" })
            
        }
    const task = await taskRepository.deleteTask(task_id)
    if (task) {
        return res.status(200).json({ message: 'Producto eliminado correctamente' })
        
    } else {
        return res.status(404).json({ message: 'No se ha encontrado el producto' })
    }
    }catch (error) {
        errorHandler(res, error, 'Error al eliminar tarea');
    }

}

export const updateTaskController = async (req, res) => {
    const {task_id} = req.params
    const {task_data} = req.body
    console.log('task_id recibido:', task_id);  // Verificamos el task_id recibido
    console.log('task_data recibido:', task_data);  // Verificamos task_data recibido
    try{
        if (!task_id) {
            return res.status(404).json({ message: 'ID de tarea o datos incompletos' })
        }
    const task = await taskRepository.updateTask(task_id, task_data)
    if (task) {
        return res.status(200).json({ message: 'Producto actualizado correctamente' })
    } else {
        return res.status(404).json({ message: 'No se ha encontrado el producto' })
    }
    }catch (error) {
        errorHandler(res, error, 'Error al actualizar tarea');
    }
}