import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { getMe, update, deleteProfile } from "./profile.controller.ts";
import removeReport from "../../../middlewares/remove.report.ts";
import { checkSpamOrBan } from "../../../middlewares/report.middleware.ts";

const profileRouter = e.Router()

profileRouter.use(removeReport)

profileRouter.get("/getme", authMiddleware, getMe)
profileRouter.put("/update", authMiddleware, update)
profileRouter.delete("/delete", authMiddleware, checkSpamOrBan, deleteProfile)

export default profileRouter