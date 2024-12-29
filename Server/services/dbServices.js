const { MongoClient } = require("mongodb");
const redisService = require("./redisServices");

const uri = "mongodb://localhost:27017";
const dbName = "dnsRecordsDB";
const collectionName = "records";

const client = new MongoClient(uri, { useUnifiedTopology: true });

(async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
})();

async function fetchRecord(domain) {
    try {
        const cachedRecord = await redisService.getCache(domain);
        if (cachedRecord) return cachedRecord;

        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const record = await collection.findOne({ name: domain });

        if (record) await redisService.setCache(domain, record);

        return record;
    } catch (error) {
        console.error("Error fetching record:", error);
        return null;
    }
}

async function fetchRecords() {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        return await collection.find().toArray();
    } catch (error) {
        throw error;
    }
}

async function addRecord(record) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(record);

        await redisService.deleteCache(record.name);
    } catch (error) {
        throw error;
    }
}

module.exports = { fetchRecord, fetchRecords, addRecord };
