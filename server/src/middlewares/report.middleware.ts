import { request, response } from "express";
import error from "../errors/error.ts";
import AUTH from "../models/user.model.ts";

export async function checkSpamOrBan(req: typeof request, res: typeof response, next: any) {
    try {
        const userId = (req.user as { _id: string })._id

        const user = await AUTH.findById(userId)

        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        if (user.status === "spam" || user.status === "ban") {
            return error(res, `Siz spamdasiz yoki bandasiz chiqishinggizni kuting chiqish vaqti: ${user?.isDisActiveData}`)
        }

        next()

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function checkBan(req: typeof request, res: typeof response, next: any) {
    try {
        const userId = (req.user as { _id: string })._id

        const user = await AUTH.findById(userId)

        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        if (user.status === "ban") {
            return error(res, `Bandasiz chiqishinggizni kuting chiqish vaqti: ${user?.isDisActiveData}`)
        }

        next()

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}