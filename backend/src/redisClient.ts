import Redis from "ioredis";
import { ENV } from "./config/env";// Ensure your ENV file has REDIS_URL

const redis = new Redis(ENV.REDIS_URL || "redis://127.0.0.1:6379");

redis.on("connect", () => {
    console.log("🔵 Redis connected");
});

redis.on("error", (err) => {
    console.error("🔴 Redis Error:", err);
});

export default redis;
