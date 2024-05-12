const express = require('express');
const http = require('http');
const db = require('./mongoConnection'); // Import MongoDB connection
const Message = require('./models/messageModel'); // Import Message model
const { getCompletion } = require('./apiHandler'); // Import API handler
const setupWebSocketServer = require('./websocketServer'); // Import WebSocket server setup
const messageRoutes = require('./routes/messageRoutes'); // Import messageRoutes

const app = express();
const PORT = 5000;

app.use(express.json());

const server = http.createServer(app);
const wss = setupWebSocketServer(server);

// WebSocket server setup...
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', async (message) => {
        console.log('Received message:', message);
        try {
            // Convert the buffer to a string and parse it as JSON
            const receivedMessage = JSON.parse(message.toString());
            console.log('Parsed message:', receivedMessage);

            // Ensure the message object includes a "prompt" or "messages" field
            const messageToSend = {
                prompt: receivedMessage.content || receivedMessage.messages,
                model: 'openai/gpt-3.5-turbo'
            };

            const responseData = await getCompletion(messageToSend);

            // Save the message and response to the database
            const newMessage = new Message({
                content: receivedMessage.content || receivedMessage.messages,
                response: responseData
            });
            await newMessage.save();

            ws.send(responseData);
        } catch (error) {
            console.error('Error:', error.response.data);
            ws.send(JSON.stringify({ error: 'Failed to send message' }));
        }
    });
});

// Mount the messageRoutes middleware
app.use('/', messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
