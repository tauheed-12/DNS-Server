const dgram = require("dgram");
const dnsPacket = require("dns-packet");

const client = dgram.createSocket("udp4");

const queryDNS = (domain) => {
    const query = dnsPacket.encode({
        type: "query",
        id: 1,
        flags: dnsPacket.RECURSION_DESIRED,
        questions: [
            {
                type: "A",
                name: domain,
            },
        ],
    });

    client.send(query, 53, "127.0.0.1", (err) => {
        if (err) {
            console.error("Error sending query:", err);
            client.close();
        }
    });
};

client.on("message", (msg) => {
    const response = dnsPacket.decode(msg);
    console.log("DNS Response:", response.answers);
    client.close();
});

const domain = process.argv[2] || "ksaquib.surge.sh";
queryDNS(domain);
