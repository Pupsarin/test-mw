const db = require('../models');

exports.signInUp = async function (req, res, next) {
try {
        let user = await db.User.findOne({
            username: req.body.username
        });

        if (user) {
            let { username, token } = user;
            console.log({username, token})
            let isMatch = await user.comparePassword(req.body.password);
            if (isMatch) {
                return res.status(200).json({ username, token });
            } else {
                return next({
                    status: 400,
                    message: "Invalid password."
                });
            }
        } else {
            let user = await db.User.create(req.body);
            let { username, token } = user;
            return res.status(200).json({ username, token });
        }

} catch(error) {
    return next({
            status: 400,
            error
        });
    }
};