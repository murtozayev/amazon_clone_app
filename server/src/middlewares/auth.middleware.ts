import { request, response } from "express";
import error from "../errors/error.ts";
import jwt from "../plugins/jwt.ts";
import AUTH from "../models/user.model.ts";

export default async function (req: typeof request, res: typeof response, next: any) {
    try {
        const { amazon_clone } = req.cookies

        if (!amazon_clone) {
            return error(res, "User ro'yxatdan o'tmagan", 401)
        }

        const decode = jwt("verify", amazon_clone) as { id: string }

        if (!decode) {
            return error(res, "User ro'yxatdan o'tmagan", 401)
        }

        const user = await AUTH.findById(decode.id)

        if (!user) {
            return error(res, "User ro'yxatdan o'tmagan", 401)
        }

        req.user = user
        next()
    } catch (err) {
        return error(res, (err as Error).message)
    }
}