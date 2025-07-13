import mongoose from "mongoose";

export const connection = async () => {
    try {
        const Mongodb = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Mongdb connected successfully")
    } catch (error) {
        console.log("error while connecting mongodb", error)
    }
}



