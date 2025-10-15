import e from "express";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { addCard, cards, deleteCard, oneCard, updateCard } from "./card.controller.ts";
import removeReport from "../../../middlewares/remove.report.ts";
import { checkSpamOrBan } from "../../../middlewares/report.middleware.ts";

const cardRouter = e.Router()

cardRouter.use(removeReport)

cardRouter.post("/add", authMiddleware, checkSpamOrBan, addCard)
cardRouter.get("/all", authMiddleware, cards)
cardRouter.get("/one/:id", authMiddleware, oneCard)
cardRouter.patch("/update/:id", authMiddleware, checkSpamOrBan, updateCard)
cardRouter.delete("/delete/:id", authMiddleware, checkSpamOrBan, deleteCard)

export default cardRouter