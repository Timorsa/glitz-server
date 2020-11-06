const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model 
const User = require('../models/User')

// hashing key
const SECRET_KEY = require('../config/keys').secretKey

module.exports = {
    async signUp(req, res, next) {
        let { email, password, firstName, lastName, role } = req.body;
        email = email.toLowerCase();

        try {
            // check if user exists
            let user = await User.findOne({ email });
            if (user)
                return res
                    .status(403)
                    .json({
                        error: 'Mail Already Registered, Please Try Again'
                    })
            // if no user create one
            user = new User({
                email,
                password,
                firstName,
                lastName,
                role
            });
            // hash passwords
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            }

            jwt.sign(payload, SECRET_KEY, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
            // send error to general error handler
            next({
                status: 500,
                message: 'Oops! something went wrong , failed to sign-up.',
            });
        }
    },
    async signIn(req, res, next) {
        let { email, password } = req.body;
        email = email.toLowerCase();
        try {
            // check if user exists
            let user = await User.findOne({ email });

            if (!user)
                return res.status(403).json({ error: 'Wrong Email, Please Try Again.' });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(403).json({ error: 'Wrong Credentials, Please Try Again' });

            const payload = {
                user: {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            }

            jwt.sign(payload, SECRET_KEY, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
            // send error to general error handler
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    }
}

