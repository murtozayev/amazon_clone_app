import { request, response } from "express";
import AUTH from "../../../models/user.model.ts";
import error from "../../../errors/error.ts";

export async function getUsers(req: typeof request, res: typeof response) {
    const users = await AUTH.find({ _id: { $ne: (req.user as any)?._id } })

    return res.status(200).json(users)
}

export async function getAdmins(req: typeof request, res: typeof response) {
    return res.status(200).json(await AUTH.find({ role: "admin" }))
}

export async function getOneUser(req: typeof request, res: typeof response) {
    return res.status(200).json(await AUTH.findById(req.params.id))
}

export async function removeUser(req: typeof request, res: typeof response) {

    const user = await AUTH.findById(req.params.id)

    if (!user) {
        return error(res, "Foydalanuvchi topilmadi", 404)
    }

    if (user.role === "owner") {
        return error(res, "Siz yaratuvchini chiqarmoqchisiz", 400)
    }

    if(user._id === (req.user as any)?._id) {
        return error(res, "Siz o'zinggizni o'chira olmaysiz", 400)
    }

    await AUTH.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: "Foydalanuvchi o'chirildi" })
}

export async function setAsAdmin(req: typeof request, res: typeof response) {
    try {
        const { role } = req.body

        if (!role) {
            return error(res, "Siz role yozmadinggiz", 400)
        }

        if (role !== "admin" && role !== "user") {
            return error(res, "Kechirasiz yaratuvchi o'rniggizni tushirmang", 400)
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

        return res.status(200).json({message: `Role ${role} ga almashtirildi`})

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function spamUser(req: typeof request, res: typeof response) {
    try {
        const { status, time } = req.body

        if (!status || !time) {
            return error(res, "Siz vaqt yoki status yozmadinggiz", 400)
        }

        if (status !== "spam") {
            return error(res, "Siz faqat SPAM dan boshqa status mumkin emas", 400)
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
            return error(res, "Siz vaqt yoki status yozmadinggiz", 400)
        }

        if (status !== "ban") {
            return error(res, "Siz faqat BAN dan boshqa status mumkin emas", 400)
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