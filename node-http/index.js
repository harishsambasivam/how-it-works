const http = require('http');

const server = http.createServer();

server.listen(3000, () => {
    console.log("server running on PORT 3000");
});

const connectionMap = {};

// event listens for new tcp connections
server.on('connection', connection => {
    const { remoteAddress, remotePort } = connection;
     connectionMap[`remoteAddress:remotePort`] = connectionMap[`remoteAddress:remotePort`]++ || 1;
     console.log(`${remoteAddress}:${remotePort} has established ${connectionMap["remoteAddress:remotePort"]} connections`)
});

server.on('request',(req,res) => {
        // this will take 10 secs to return response
        const timeoutId = setTimeout(() => {
            res.write(JSON.stringify(req.client._peername));
            res.end();
        }, 10000);

        // this will timeout after 9s
        res.setTimeout(9000, () => {
            clearTimeout(timeoutId);
            res.statusCode = 504;
            res.write("request timedout");
            res.end();
        })
});



server.headersTimeout = 3000;
server.maxHeadersCount = 100;

// tcp
server.keepAliveTimeout = 20000;
server.maxRequestsPerSocket = 1;
server.timeout = 2000;