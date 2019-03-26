const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    muted: {
        type: Boolean,
        required: true,
        default: false
    },
    banned: {
        type: Boolean,
        required: true,
        default: false 
    },
    password: {
        type: String,
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});


const User = mongoose.model("User", userSchema);

module.exports = User;