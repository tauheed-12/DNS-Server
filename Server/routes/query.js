const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.get("/", (req, res) => {
    const { domain } = req.query;

    if (!domain) {
        return res.status(400).json({ success: false, message: "Domain is required" });
    }

    exec(`node client.js ${domain}`, (err, stdout, stderr) => {
        if (err) {
            console.error("Error executing client.js:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (stderr) {
            console.error("Error output from client.js:", stderr);
        }

        res.json({ success: true, output: stdout });
    });
});

module.exports = router;
