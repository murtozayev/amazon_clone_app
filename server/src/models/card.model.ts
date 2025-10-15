import { model, Schema } from "mongoose";

const cardSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "Users" },
    cards: [{
        cardNumber: { type: Number, minlength: 16, maxlength: 16 },
        cardBalance: { type: Number, default: 10000000 }
    }]
}, {
    timestamps: true
})

const CARD = model("Cards", cardSchema)

export default CARD