import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/finance_tracker",
    JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
    PORT: process.env.PORT || 5000,
    REDIS_URL : process.env.REDIS_URL||"redis://127.0.0.1:6379",

};
