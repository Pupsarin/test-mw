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

messageSchema.pre('save', async function(next) {
    try {
        if (this.messageBody.length < 200) {
            return next()
        } else {
            let errMsg = 'message is longer than 200 characters';
            this.invalidate(errMsg);
            return next(new Error(errMsg));
        }
    } catch (error) {
        return next(error);
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;