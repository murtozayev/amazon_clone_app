import { request, response } from "express";
import error from "../../../errors/error.ts";
import RECENTS from "../../../models/recent.model.ts";

export async function recents(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401);
        }

        const recents = await RECENTS.findOne({ recentId: user._id })

        if (!recents) {
            return error(res, "Tarix topilmadi", 404);
        }

        return res.status(200).json(recents)
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function deleteRecent(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        let recent = await RECENTS.findOne({ recentId: user._id })

        if (!recent) {
            return error(res, "Hech qanday tarix topilmadi", 404);
        }

        recent.recents = recent.recents.filter((r: { _id: string }) => r._id.toString() !== String(req.params.id))

        await recent.save()

        return res.status(200).json({ message: "Maxsulot tarixdan olib tashlandi" })

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function clear(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        let recents = await RECENTS.findOne({ recentId: user._id })

        if (!recents) {
            return error(res, "Birorta ham tarix topilmadi", 404);
        }

        recents.recents = []

        await recents.save()

        return res.status(200).json({ message: "Tarix tozalandi" })
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}