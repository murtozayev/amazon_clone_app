import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    orders: [
        {
            items: [{type: Schema.Types.Mixed}],
            totalPrice: { type: Number, required: true },
            status: {
                type: String,
                enum: ["accepted", "going", "done"],
                default: "accepted"
            }
        }
    ]
}, { timestamps: true });

const ORDER = model("Order", orderSchema);

export default ORDER;
