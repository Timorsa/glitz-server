const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model 
const Business = require('../models/Business');
const SECRET_KEY = require('../config/keys').secretKey

module.exports = {
    async signUp(req, res, next) {
        let { name, description, email, password, phone, address, location } = req.body;
        email = email.toLowerCase();
        try {
            let business = await Business.findOne({ email });
            if (business)
                return res
                    .status(403)
                    .json({
                        error: 'Mail Already Registered, Please Try Again'
                    })

            business = new Business({
                name,
                email,
                phone,
                address,
                location,
                password,
                description,
            })

            const salt = await bcrypt.genSalt(10)
            business.password = await bcrypt.hash(password, salt);
            await business.save();

            const payload = {
                business: {
                    _id: business._id,
                    name: business.name,
                    phone: business.phone,
                    email: business.email,
                    address: business.address,
                    location: business.location,
                    description: business.description,
                }
            }

            jwt.sign(payload, SECRET_KEY, {
                expiresIn: 360000
                //  
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
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
            let business = await Business.findOne({ email });

            if (!business)
                return res.status(403).json({ error: 'Wrong Email, Please Try Again.' });

            const isMatch = await bcrypt.compare(password, business.password);

            if (!isMatch)
                return res.status(403).json({ error: 'Wrong Credentials, Please Try Again' });

            const payload = {
                business: {
                    _id: business._id,
                    name: business.name,
                    phone: business.phone,
                    email: business.email,
                    address: business.address,
                    location: business.location,
                    description: business.description,
                }
            }

            jwt.sign(payload, SECRET_KEY, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    },
    async getBusiness(req, res, next) {

    },
    async getBusinessesByLocation(req, res, next) {

    },
    async update(req, res, next) {

    },
    async addService(req, res, next) {

    },
    async editService(req, res, next) {

    },
    async removeService(req, res, next) {

    },
    async createPost(req, res, next) {

    },
    async removePost(req, res, next) {

    },
    async getCostumers(req, res, next) {

    },
    async addTag(req, res, next) {

    },
    async removeTag(req, res, next) {

    }
    async getReviews(req, res, next) {

    }
}