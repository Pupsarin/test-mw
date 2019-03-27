const db = require('../models');

exports.createMessage = async function(req, res) {
    try {
        let message = await db.Message.create({
            messageBody: req.messageBody,
            user: req.userId
        });
        let foundUser = await db.User.findById(req.userId);
        foundUser.messages.push(message.id);
        await foundUser.save();
        // let foundMessage = await db.Message.findById(message.id);
        // return res.json(foundMessage);
    } catch (err) {
        return err;
    }
};

exports.getAllMessages = async function() {
    try {
        let messages = await db.Message.find({}).populate('user', 'username')
        console.log(messages);
        return messages;
    } catch (err) {
        return err;
    }
    
}