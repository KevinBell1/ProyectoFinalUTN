import taskRepository from "../repositories/task.repository.js"


export const createTaskController = async (req, res) => {
    try{
        const new_task = req.body
    if(!new_task) {return res.status(400).json({message: "Task data is required"})}
    console.log(new_task)
    const task = await taskRepository.createTask(new_task)
    return res.status(200).json({task})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Error creating task", error})
    }
}

export const obtenerTaskController = async (req, res) => {
    try{
        const {user_id} = req.params
        const tasksList = await taskRepository.obtenerTasks(user_id)
        res.status(200).json(tasksList)
    }catch(error){
        res.status(500).json({message: error})
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
    }catch(error){
        res.status(500).json({message: error})
    }

}

export const updateTaskController = async (req, res) => {
    const {task_id} = req.params
    const {task_data} = req.body
    try{
        if (!task_id) {
            return res.status(404).json({ message: "No se ha encontrado el  producto" })
        }
    const task = await taskRepository.updateTask(task_id, task_data)
    if (task) {
        return res.status(200).json({ message: 'Producto actualizado correctamente' })
    } else {
        return res.status(404).json({ message: 'No se ha encontrado el producto' })
    }
    }catch(error){
        res.status(500).json({message: error})
    }
}