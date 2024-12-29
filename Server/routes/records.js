const express = require("express");
const { fetchRecords, addRecord } = require("../services/dbServices");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const records = await fetchRecords();
        res.json({ records });
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    const { name, type, data } = req.body;

    if (!name || !type || !data) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        await addRecord({ name, type, data });
        res.json({ success: true, message: "DNS record added successfully!" });
    } catch (error) {
        console.error("Error adding record:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
