import { request, response } from "express";
import AUTH from "../../../models/user.model.ts";
import error from "../../../errors/error.ts";

export async function getUsers(req: typeof request, res: typeof response) {
    return res.status(200).json(await AUTH.find({}))
}

export async function getAdmins(req: typeof request, res: typeof response) {
    return res.status(200).json(await AUTH.find({ role: "admin" }))
}   

export async function getOneUser(req: typeof request, res: typeof response) {
    return res.status(200).json(await AUTH.findById(req.params.id))
}

export async function removeUser(req: typeof request, res: typeof response) {
    await AUTH.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: "Foydalanuvchi o'chirildi" })
}

export async function setAsAdmin(req: typeof request, res: typeof response) {
    try {
        const { role } = req.body

        if (!role) {
            return error(res, "Siz role yozmadinggiz", 400)
        }

        if (role !== "admin") {
            return error(res, "Kechirasiz yaratuvchi o'rniggizni tushirmang")
        }

        const user = await AUTH.findById(req.params.id)

        if (!user) {
            return error(res, "Kechirasiz bunday foydalanuvchi yo'q", 404)
        }

        if (user.role === "owner") {
            return error(res, "Himmatinggizni tushirmang", 400)
        }

        user.role = role
        await user.save()

        return res.status(200).json(user)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function spamUser(req: typeof request, res: typeof response) {
    try {
        const { status, time } = req.body

        if (!status || !time) {
            return error(res, "Siz vaqt yoki status yozmadinggiz")
        }

        if (status !== "spam") {
            return error(res, "Siz faqat SPAM dan boshqa status mumkin emas")
        }

        const user = await AUTH.findById(req.params.id)


        if (!user) {
            return error(res, "Foydalanuvchi topilmadi", 404)
        }

        if (user.role === "admin" || user.role === "owner") {
            return error(res, "Admin yoki ownerga spam berib bo'lmaydi", 400)
        }

        user.status = status
        //@ts-ignore
        user.isDisActiveData = Date.now() + time * 60 * 60 * 1000

        return res.status(200).json(user)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function banUser(req: typeof request, res: typeof response) {
    try {
        const { status, time } = req.body

        if (!status || !time) {
            return error(res, "Siz vaqt yoki status yozmadinggiz")
        }

        if (status !== "ban") {
            return error(res, "Siz faqat BAN dan boshqa status mumkin emas")
        }

        const user = await AUTH.findById(req.params.id)

        if (!user) {
            return error(res, "Foydalanuvchi topilmadi", 404)
        }

        if (user.role === "owner") {
            return error(res, "Ownerga spam berib bo'lmaydi", 400)
        }

        user.status = status
        //@ts-ignore
        user.isDisActiveData = Date.now() + time * 24 * 60 * 60 * 1000

        await user.save()

        return res.status(200).json(user)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}