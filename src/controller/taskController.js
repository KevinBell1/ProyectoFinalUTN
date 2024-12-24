import taskRepository from "../repositories/task.repository.js"


export const createTaskController = async (req, res) => {
    try{
        const new_task = req.body
    if(!new_task) {return res.status(400).json({message: "Task data is required"})}
    const task = await taskRepository.createTask(new_task)
    return res.status(200).json({task})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Error creating task"})
    }
}


