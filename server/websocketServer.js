const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('message', async (message) => {
            console.log('Received message:', message);
            // Handle incoming messages...
        });
    });

    return wss;
}

module.exports = setupWebSocketServer;
