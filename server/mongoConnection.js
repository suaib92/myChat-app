const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://suaib:1KeMLnbc41iRcPlN@cluster0.zun3yp9.mongodb.net/chat_history', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
