import { model, Schema } from "mongoose";

const favSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    favs: [{ type: Schema.Types.Mixed }]
}, {
    timestamps: true
})

const FAVOURITE = model("Favourite", favSchema)

export default FAVOURITE