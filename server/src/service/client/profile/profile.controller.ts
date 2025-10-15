import { request, response } from "express";
import error from "../../../errors/error.ts";
import AUTH from "../../../models/user.model.ts";

export async function getMe(req: typeof request, res: typeof response) {
    try {
        const me = await AUTH.findById((req.user as { _id: string })._id)

        if (!me) {
            return error(res, "Profil topilmadi", 404)
        }

        return res.status(200).json(me)
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function update(req: typeof request, res: typeof response) {
    try {
        const profile = await AUTH.findByIdAndUpdate((req.user as { _id: string })._id, { ...req.body }, { new: true })

        if (!profile) {
            return error(res, "Profil yangilanmadi", 400)
        }

        return res.status(200).json({ message: "Profil yangilandi", profile })
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function deleteProfile(req: typeof request, res: typeof response) {
    try {
        const removed = await AUTH.findByIdAndDelete((req.user as { _id: string })._id)

        if (!removed) {
            return error(res, "O'chirishda muammo yuzaga keldi")
        }

        return res.status(200).json(removed.email)
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}