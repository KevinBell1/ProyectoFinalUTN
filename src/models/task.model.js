import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
        task: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema)

export default Task