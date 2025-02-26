const axios = require("axios");
const redis = require("redis");

const BASE_URL = "http://localhost:5000/api";
const USER_ID = "67b578678a78e576cd44eda8"; // Replace with a valid user ID

const redisClient = redis.createClient();

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const testRedisCache = async () => {
  try {
    console.log("\n🟢 Starting Redis Cache Test...\n");

    // 1️⃣ First GET request (MongoDB fetch)
    console.log("🔹 Fetching transactions (First Time)...");
    let startTime = Date.now();
    let response = await axios.get(`${BASE_URL}/transactions?filter=all&sort=date&order=desc&page=1`);
    console.log("✅ First request completed in:", Date.now() - startTime, "ms");

    // 2️⃣ Second GET request (Should be cached)
    console.log("\n🔹 Fetching transactions (Second Time)...");
    startTime = Date.now();
    response = await axios.get(`${BASE_URL}/transactions?filter=all&sort=date&order=desc&page=1`);
    console.log("✅ Second request (Cached) completed in:", Date.now() - startTime, "ms");

    // 3️⃣ Check Redis Storage
    console.log("\n🔹 Checking Redis cache...");
    redisClient.get(`transactions:${USER_ID}:all:date:desc:1:10`, (err, data) => {
      if (data) {
        console.log("✅ Data found in Redis cache.");
      } else {
        console.log("❌ Data NOT found in Redis.");
      }
    });

    // 4️⃣ Add a new transaction (This should clear cache)
    console.log("\n🔹 Adding a new transaction...");
    const newTransaction = {
      userId: USER_ID,
      title: "Test Transaction",
      amount: 100,
      category: "Misc",
    };
    await axios.post(`${BASE_URL}/transactions`, newTransaction);
    console.log("✅ Transaction added!");

    // Wait for cache to be cleared
    await delay(3000);

    // 5️⃣ Fetch transactions again (Cache should be refreshed)
    console.log("\n🔹 Fetching transactions after adding new entry...");
    startTime = Date.now();
    response = await axios.get(`${BASE_URL}/transactions?filter=all&sort=date&order=desc&page=1`);
    console.log("✅ Third request (Cache refreshed) completed in:", Date.now() - startTime, "ms");

    // Close Redis connection
    redisClient.quit();
    console.log("\n✅ Redis Cache Test Completed Successfully!\n");
  } catch (error) {
    console.error("❌ Error during test:", error.message);
  }
};

testRedisCache();
