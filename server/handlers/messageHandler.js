const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try {
        let message = await db.Message.create({
            messageBody: req.messageBody,
            user: req.userId
        });
        let foundUser = await db.User.findById(req.userId);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(smartDevice.id);
        return res.json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

