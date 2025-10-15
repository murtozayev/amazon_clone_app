import { request, response } from "express";
import error from "../errors/error.ts";
import AUTH from "../models/user.model.ts";

export async function checkRole(req: typeof request, res: typeof response, next: any) {
    try {
        const user = req.user as { _id: string }

        const role = await AUTH.findById(user._id)

        if (!role) {
            return error(res, "Siz ro'yxatdan o'tmagansiz", 401)
        }

        const isOwnerOrAdmin = role?.role === "admin" || role?.role === "owner"

        if (!isOwnerOrAdmin) {
            return error(res, "Kechirasiz siz shunchaki foydalanuvchisiz", 403)
        }

        next()

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function checkOwner(req: typeof request, res: typeof response, next: any) {
    try {
        const user = req.user as { _id: string }

        const role = await AUTH.findById(user._id)

        if (!role) {
            return error(res, "Siz ro'yxatdan o'tmagansiz", 401)
        }

        const isOwnerOrAdmin = role?.role === "owner"

        if (!isOwnerOrAdmin) {
            return error(res, "Kechirasiz siz shunchaki admin yoki foydalanuvchisiz", 403)
        }

        next()

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}