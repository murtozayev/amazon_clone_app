import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Users" },
    items: [
        {
            product: { type: Schema.Types.Mixed, required: true },
            quantity: { type: Number, default: 1 },
            totalPrice: { type: Number, default: 0 },
            select: { type: Boolean, default: false }
        }
    ]
}, {
    timestamps: true
})

const CART = model("Carts", cartSchema)

export default CART