import { request, response } from "express";
import error from "../../../errors/error.ts";
import TASK from "../../../models/task.model.ts";

export async function createTask(req: typeof request, res: typeof response) {
    try {
        const { to, title, desc } = req.body

        if (!to || !title || !desc) {
            return error(res, "Ma'lumotlar to'liq emas", 400)
        }

        const newTask = await TASK.create({ to, title, desc })

        return res.status(200).json({ message: "Task yaratildi", newTask })

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function allTasks(req: typeof request, res: typeof response) {
    return res.status(200).json(await TASK.find({}))
}

export async function oneTask(req: typeof request, res: typeof response) {
    return res.status(200).json(await TASK.findById(req.params.id))
}

export async function updateTask(req: typeof request, res: typeof response) {
    return res.status(200).json({ message: "Vazifa Yangilandi", task: await TASK.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }) })
}

export async function removeTask(req: typeof request, res: typeof response) {
    return res.status(200).json({ message: "Vazifa o'chirildi", task: await TASK.findByIdAndDelete(req.params.id) })
}

export async function clearTask(req: typeof request, res: typeof response) {
    await TASK.deleteMany({})
    return res.status(200).json({ message: "Vazifa Tozalandi" })
}

export async function completeTask(req: typeof request, res: typeof response) {
    try {
        const task = await TASK.findById(req.params.id)

        if (!task) {
            return error(res, "Taskni topa olmadik", 404)
        }

        const completed = task.completed

        if (completed) {
            task.completed = false
            await task.save()
        } else {
            task.completed = true
            await task.save()
        }

        return res.status(200).json(task)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}