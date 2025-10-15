import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { addToCart, carts, quantity, removeFromCart, selectToggle } from "./cart.controller.ts";
import removeReport from "../../../middlewares/remove.report.ts";
import { checkBan, checkSpamOrBan } from "../../../middlewares/report.middleware.ts";

const cartRouter = e.Router()
cartRouter.use(removeReport)

cartRouter.post("/add/:id", authMiddleware, checkBan, addToCart)
cartRouter.delete("/remove/:id", authMiddleware, checkBan, removeFromCart)
cartRouter.get("/carts", authMiddleware, carts)
cartRouter.patch("/quantity/:id", authMiddleware, checkSpamOrBan, quantity)
cartRouter.patch("/select/:id", authMiddleware, checkSpamOrBan, selectToggle)

export default cartRouter