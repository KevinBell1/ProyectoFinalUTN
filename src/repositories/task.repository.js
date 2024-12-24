import Task from "../models/task.model.js";


class taskRepository {
    static async createTask(new_task_data) {
        const new_task = new Task(new_task_data)
        return await new_task.save()
    }
}

export default taskRepository

