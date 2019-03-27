const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageBody: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;