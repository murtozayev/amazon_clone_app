import { response } from "express"

export default function (res: typeof response, Err: string, status: number) {
    return res.status(status).json({ message: Err })
}
