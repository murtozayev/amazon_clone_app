import { response } from "express"

export default function (res: typeof response, Err: string, status?: number) {
    if (status === 500) {
        return res.status(500).json({ message: Err })
    }

    if (status === 401) {
        return res.status(401).json({ message: "Foydalanuvchi ro'yxatdan o'tmagan" })
    }

    if (status) {
        return res.status(status).json({ error: Err })
    }

    return res.status(400).json({ error: Err })
}
