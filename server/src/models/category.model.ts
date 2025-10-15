import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    productId: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    name: { type: String, required: true, index: true },
    icon: { type: String },
    desc: { type: String }
}, {
    timestamps: true
})

const CATEGORY = model("Categories", categorySchema)

export default CATEGORY