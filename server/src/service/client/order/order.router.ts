import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { addOrder, clearOrder, deleteOrder, getAllOrders, oneOrder } from "./order.controller.ts";
import removeReport from "../../../middlewares/remove.report.ts";
import { checkBan, checkSpamOrBan } from "../../../middlewares/report.middleware.ts";

const orderRouter = e.Router()

orderRouter.use(removeReport)

orderRouter.post("/add", authMiddleware, checkSpamOrBan, addOrder)
orderRouter.get("/orders", authMiddleware, getAllOrders)
orderRouter.get("/one/:id", authMiddleware, oneOrder)
orderRouter.delete("/delete/:id", authMiddleware, checkBan, deleteOrder)
orderRouter.delete("/clear", authMiddleware, checkBan, clearOrder)

export default orderRouter