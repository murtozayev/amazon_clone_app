import jwt from "jsonwebtoken"

export default function <T>(type: "sign" | "verify", payload: Record<string, T> | string) {
    if (type === "sign") {
        const encode = jwt.sign(payload, process.env.JWT as string, { expiresIn: "10d" })

        return encode
    } else if (type === "verify") {
        const decode = jwt.verify(payload as string, process.env.JWT as string)

        return decode
    }
}