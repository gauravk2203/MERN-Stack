import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGOURI) {
        console.error("MONGOURI environment variable is not defined");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(process.env.MONGOURI);
        console.log(`Database connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

export { connectDB };
