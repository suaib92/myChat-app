const mongoose = require('mongoose');

// Define schema for messages
const messageSchema = new mongoose.Schema({
    content: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
});

// Create Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
