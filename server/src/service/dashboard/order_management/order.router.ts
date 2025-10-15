import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { checkRole } from "../../../middlewares/role.middleware.ts";
import { getAllOrders, oneOrder, orderStatus } from "./order.controller.ts";
import { checkBan } from "../../../middlewares/report.middleware.ts";

const orderDashRouter = e.Router()

orderDashRouter.post("/status/:userId/:id", authMiddleware, checkRole, checkBan, orderStatus)
orderDashRouter.get("/all", authMiddleware, checkRole, getAllOrders)
orderDashRouter.get("/one/:userId/:id", authMiddleware, checkRole, oneOrder)

export default orderDashRouter