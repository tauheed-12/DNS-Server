const dgram = require("dgram");
const dnsPacket = require("dns-packet");
const { fetchRecord } = require("../services/dbServices");

const server = dgram.createSocket("udp4");

server.on("message", async (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    console.log("Incoming Request:", incomingReq);

    const domain = incomingReq.questions[0].name;
    const record = await fetchRecord(domain);

    if (!record) {
        console.log(`No record found for ${domain}`);
        return;
    }

    const ans = dnsPacket.encode({
        type: "response",
        id: incomingReq.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers: [
            {
                type: record.type,
                class: "IN",
                name: domain,
                data: record.data,
            },
        ],
    });

    server.send(ans, rinfo.port, rinfo.address);
});

function startDNSServer() {
    server.bind(53, () => console.log("DNS Server is running on port 53"));
}

module.exports = { startDNSServer };
