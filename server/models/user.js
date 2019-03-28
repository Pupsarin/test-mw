const mongoose = require('mongoose');
const db = require('../models');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    isMuted: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isBanned: {
        type: Boolean,
        required: true,
        default: false 
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default: generateToken
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

function generateToken() {
    let tkn = new Date().getTime() + Math.random().toString(36).substring(2);
    return tkn;
}

userSchema.pre('save', async function(next){
    try {
        let user = await db.User.findOne({username: this.username});
        if (!user) {
            return next();
        } else {
            this.invalidate("username must be unique");
            return next(new Error("username must be unique"));
        }
    } catch(err) {
        return next(err);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;