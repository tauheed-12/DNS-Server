const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

async function getCache(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) return reject(err);
            resolve(data ? JSON.parse(data) : null);
        });
    });
}

async function setCache(key, value, expiry = 3600) {
    return new Promise((resolve, reject) => {
        redisClient.setex(key, expiry, JSON.stringify(value), (err) => {
            if (err) return reject(err);
            resolve(true);
        });
    });
}

async function deleteCache(key) {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err) => {
            if (err) return reject(err);
            resolve(true);
        });
    });
}

module.exports = { getCache, setCache, deleteCache };
