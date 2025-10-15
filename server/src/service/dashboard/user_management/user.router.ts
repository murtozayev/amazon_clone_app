import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { checkOwner, checkRole } from "../../../middlewares/role.middleware.ts";
import { banUser, getAdmins, getOneUser, getUsers, removeUser, setAsAdmin, spamUser } from "./user.controller.ts";
import { checkBan } from "../../../middlewares/report.middleware.ts";

const userRouter = e.Router()

userRouter.get("/all", authMiddleware, checkRole, getUsers)
userRouter.get("/admins", authMiddleware, checkOwner, getAdmins)
userRouter.get("/one/:id", authMiddleware, checkRole, getOneUser)
userRouter.delete("/delete/:id", authMiddleware, checkOwner, removeUser)
userRouter.post("/setadmin/:id", authMiddleware, checkOwner, setAsAdmin)
userRouter.post("/setspam/:id", authMiddleware, checkRole, checkBan, spamUser)
userRouter.post("/setban/:id", authMiddleware, checkOwner, banUser)

export default userRouter