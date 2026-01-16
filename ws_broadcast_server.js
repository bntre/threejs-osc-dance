/**
 * Simple WebSocket Broadcast Server (Node.js, CommonJS)
 *
 * Requirements:
 *   - Node.js
 *
 * Install:
 *   npm init -y
 *   npm install ws
 *
 * Run:
 *   node ws_broadcast_server.js
 */

const { WebSocketServer } = require('ws');

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    // data may be Buffer
    const text = Buffer.isBuffer(data) ? data.toString('utf8') : String(data);

    // Optional debug: try parse JSON
    try {
      console.log('Message JSON:', JSON.parse(text));
    } catch {
      // ignore
    }

    // broadcast as original data (Buffer/string) to all clients
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
