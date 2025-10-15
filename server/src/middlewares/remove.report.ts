import { request, response } from "express";
import error from "../errors/error.ts";
import jwt from "../plugins/jwt.ts";
import AUTH from "../models/user.model.ts";

export default async function (req: typeof request, res: typeof response, next: any) {
    try {
        const { amazon_clone } = req.cookies

        if (!amazon_clone) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        const decode = jwt("verify", amazon_clone) as { id: string }

        if (!decode) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        const user = await AUTH.findById(decode.id)

        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        if (user.status !== "active") {
            //@ts-ignore
            if (user.isDisActiveData && Date.now() >= user.isDisActiveData) {
                user.status = "active"
                //@ts-ignore
                user.isDisActiveData = null

                await user.save()
            }
        }

        next()

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}