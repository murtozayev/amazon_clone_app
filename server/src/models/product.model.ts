import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String, required: true, index: true
    },
    price: { type: Number, required: true },
    desc: { type: String },
    image: { type: String, required: true },
    isDiscount: { type: Boolean, default: false },
    discount: {
        precent: { type: Number, min: 0, max: 100 },
        price: { type: Number, min: 0 }
    },
    hasVariants: { type: Boolean, default: false },
    variants: {
        variantImg: [{ type: String }],
        variantDesc: [{ type: String }]
    },
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.Mixed }]
}, {
    timestamps: true
})

const PRODUCT = model("Products", productSchema)

export default PRODUCT