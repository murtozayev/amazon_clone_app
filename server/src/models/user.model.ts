import { model, Schema } from "mongoose";
import type { IUser } from "../types/index.ts";

const authSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: "user", enum: ["owner", "admin", "user"] },
    status: { type: String, default: "active", enum: ["active", "spam", "ban"] },
    isDisActiveData: { type: Date, default: null }
}, {
    timestamps: true
})

const AUTH = model("Users", authSchema)

export default AUTH