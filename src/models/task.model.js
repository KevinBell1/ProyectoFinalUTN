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
        user_id: {
            type: String,
            required: true
        }
        
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema)

export default Task