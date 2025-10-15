import { model, Schema } from "mongoose";

const codeSchema = new Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    code: { type: String, required: true },
    expires: { type: Date, default: () => new Date(Date.now() + 1 * 60 * 1000) }
});

const CODE = model("Code", codeSchema);
export default CODE;
