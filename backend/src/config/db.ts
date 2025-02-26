import mongoose from "mongoose";
import { ENV } from "./env";

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB URI:", ENV.MONGO_URI); // Debug log

        await mongoose.connect(ENV.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default connectDB;
