const express = require('express');
const Message = require('../models/messageModel'); // Import Message model

const router = express.Router();

// Endpoint to retrieve message history
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
