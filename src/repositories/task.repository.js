import Task from "../models/task.model.js";


class taskRepository {
    static async createTask(new_task_data) {
        const new_task = new Task(new_task_data)
        return await new_task.save()
    }
    static async obtenerTasks(user_id) {
        const response = await Task.find({ user_id: user_id, active: true })
        console.log(response)
        return response
    }
    static async deleteTask(task_id) {
        return await Task.findByIdAndUpdate(task_id, { active: false }, { new: true })
    }

    static async updateTask(task_id, task_data) {
        return await Task.findByIdAndUpdate(task_id, task_data, { new: true })
    }
}


export default taskRepository

