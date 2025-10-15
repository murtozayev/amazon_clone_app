import e from "express";
const { response } = e
import jwt from "jsonwebtoken";

export default function (type: "save" | "clear", res: typeof response, value?: jwt.JwtPayload) {
    if (type === "save") {
        res.cookie("amazon_clone", value, {
            sameSite: "lax",
            httpOnly: false,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })
    } else if (type === "clear") {
        res.clearCookie("amazon_clone")
    }
}