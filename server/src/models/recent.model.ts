import { model, Schema } from "mongoose";

const recentSchema = new Schema({
    recentId: { type: Schema.Types.ObjectId, ref: "Users" },
    recents: [{ type: Schema.Types.Mixed }]
}, {
    timestamps: true
})

const RECENTS = model("Recents", recentSchema)

export default RECENTS