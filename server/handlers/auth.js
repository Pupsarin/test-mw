const db = require('../models');

exports.signInUp = async function (req, res, next) {
try {   
        const regEx = /[!-\/:-@[-`{-~-\s]/; 
        if (!regEx.test(req.body.username)) {

            if(!req.body.username && !req.body.password) {
                return next({
                    status: 400,
                    message: "Please provide username and password"
                });
            }

            if(!req.body.username) {
                return next({
                    status: 400,
                    message: "Please enter a username"
                });
            }

            if(!req.body.password) {
                return next({
                    status: 400,
                    message: "Please enter a password"
                });
            }

            if(req.body.username.length < 3) {
                return next({
                    status: 400,
                    message: "Username is too short"
                });
            }

            let user = await db.User.findOne({
                username: req.body.username
            });

            if (user) {
                let { username, token, isBanned} = user;
                if (!isBanned) { 
                    let isMatch = await user.comparePassword(req.body.password);
                    if (isMatch) {
                        return res.status(200).json({ username, token });
                    } else {
                        return next({
                            status: 400,
                            message: "Invalid password"
                        });
                    }
                } else {
                    return next({
                        status: 403,
                        message: "You are banned"
                    });
                }
            } else {
                let user = await db.User.create(req.body);
                let { username, token } = user;
                return res.status(200).json({ username, token });
            }
        } else { 
            return next({
                status: 400,
                message: "Username should not contain special characters"
            });
        }

} catch(error) {
    return next({
            status: 400,
            error
        });
    }
};