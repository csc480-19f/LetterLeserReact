const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", ws => {
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    const data = JSON.parse(message);
    console.log(`Sending Access token to Client`);
    ws.send(data.access_token);
  });
  console.log("Connected to client");
});
