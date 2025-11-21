import WebSocket, { WebSocketServer } from "ws";
import http from 'http';
const server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});
const wss = new WebSocketServer({ server });
let user = 0;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log("User Connected", ++user);
    ws.send('Hello! Message from Server!!');
});
server.listen(8080, () => {
    console.log((new Date()) + ' Server is listening on port 8080');
});
//# sourceMappingURL=index.js.map