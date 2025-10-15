import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { clear, deleteRecent, recents } from "./recent.controller.ts";
import { removeUser } from "../../dashboard/user_management/user.controller.ts";

const recentRouter = e.Router()

recentRouter.use(removeUser)

recentRouter.get("/get", authMiddleware, recents)
recentRouter.delete("/delete/:id", authMiddleware, deleteRecent)
recentRouter.delete("/clear", authMiddleware, clear)

export default recentRouter