import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    to: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const TASK = model("Tasks", taskSchema)

export default TASK