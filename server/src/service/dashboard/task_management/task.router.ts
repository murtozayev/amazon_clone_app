import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { checkOwner, checkRole } from "../../../middlewares/role.middleware.ts";
import { allTasks, clearTask, completeTask, createTask, oneTask, removeTask, updateTask } from "./task.controller.ts";

const taskRouter = e.Router()

taskRouter.post("/create", authMiddleware, checkOwner, createTask)
taskRouter.get("/get", authMiddleware, checkRole, allTasks)
taskRouter.get("/get-one/:id", authMiddleware, checkRole, oneTask)
taskRouter.put("/update/:id", authMiddleware, checkOwner, updateTask)
taskRouter.delete("/remove/:id", authMiddleware, checkOwner, removeTask)
taskRouter.delete("/clear", authMiddleware, checkOwner, clearTask)
taskRouter.patch("/complete/:id", authMiddleware, checkRole, completeTask)

export default taskRouter