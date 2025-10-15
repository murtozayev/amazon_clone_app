import mongoose from "mongoose"

export default async function() {
    try {
        await mongoose.connect(process.env.MONGO as string)
        console.log("Mongoose ulandi")
    } catch (error) {
        const err = error as Error
        console.log(err.message)
    }
}