const db = require('../models');

exports.createMessage = async function(req) {
    try {
        let user = await db.User.findOne({'token': req.userToken});
        console.log(req);
        let message = await db.Message.create({
            messageBody: req.message,
            user: user._id
        });
        user.messages.push(message.id);
        await user.save();
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.getAllMessages = async function() {
    try {
        let messages = await db.Message.find({}).populate('user', 'username -_id').select('-updatedAt');
        return messages;
    } catch (err) {
        return err;
    }
    
}