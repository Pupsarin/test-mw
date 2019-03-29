const db = require('../models');


exports.createUser = async function(req, res) {
    try {
        let user = await db.User.create({
            password: req.password,
            username: req.username
        });
    } catch (err) {
        return err;
    }
};


exports.getAllUsers = async function() {
    try {
        let messages = await db.User.find({}).select('username isBanned isMuted -_id');
        return messages;
    } catch (err) {
        return err;
    }
}