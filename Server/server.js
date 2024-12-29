const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { startDNSServer } = require("./dns/dnsServer");
const recordsRoutes = require("./routes/records");
const queryRoutes = require("./routes/query")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/records", recordsRoutes);
app.use("/api/query", queryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});

startDNSServer();
