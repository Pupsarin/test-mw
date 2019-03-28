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