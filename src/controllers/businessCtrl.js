// @ts-nocheck
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Business = require('../models/Business');
const Service = require('../models/Service');
const Tag = require('../models/Tag');

const SECRET_KEY = require('../config/keys').secretKey
const { cleanEmptyKeys } = require('../utils/general');

module.exports = {
    async signUp(req, res, next) {
        let { name, description, email, password, phone, address, image, location } = req.body;
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
                image,
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
                    image: business.image,
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
            console.log(err)
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
                    image: business.image,
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
        const { businessId } = req.params._id;
        try {
            let business = await await Business.findById(businessId).populate([
                { path: 'services' },
                { path: 'posts' },
                { path: 'reviews' },
                {
                    path: 'costumers', populate: [
                        { path: 'firstName' },
                        { path: 'lastName' },
                        { path: 'email' },
                        { path: 'image' }
                    ]
                }
            ]);
            if (business) {
                const cleanBusiness = business;
                delete cleanBusiness[password];
                res.status(200).json(cleanBusiness);
            } else {
                next({
                    status: 402,
                    message: `couldn't find business :(`
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    async getBusinessesByTags(req, res, next) {
        try {
            let businesses = await Business.find({ tags: { $in: req.body.tags } })
            businesses = businesses.map(business => ({
                _id: business._id,
                name: business.name,
                phone: business.phone,
                email: business.email,
                image: business.image,
                address: business.address,
                location: business.location,
                description: business.description,
            }))
            res.status(200).json(businesses);
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    },
    // to do
    async getBusinessesByLocation(req, res, next) {
        try {

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    // to do 
    async update(req, res, next) {
        try {

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    async addService(req, res, next) {
        try {
            const business = await Business.findById(req.business._id);
            if (business) {
                const service = new Service({ business: business._id, ...cleanEmptyKeys(req.body) })
                await service.save()
                business.services.push(service._id);
                await business.save();
                await business.populate({ path: 'services' });
                res.status(200).json({
                    service,
                    businessServices: business.services
                })
            } else next({
                status: 402,
                message: 'failed to get business'
            })

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    async editService(req, res, next) {
        try {
            if (req.business && req.params.serviceId) {
                if (req.business._id === req.params.serviceId) {
                    const service = await Service.updateOne(
                        { _id: req.params.serviceId },
                        { $set: { ...cleanEmptyKeys(req.body) } });
                    res.status(200).json(service);
                } else next({
                    status: 403,
                    message: 'un authorized request cant change service that is not yours'
                })
            } else next({
                status: 402,
                message: `non valid request`
            })
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    },
    async removeService(req, res, next) {
        try {
            if (req.business && req.params.serviceId) {
                if (req.business._id === req.params.serviceId) {
                    const service = await Service.deleteOne({ _id: req.params.serviceId });
                    const business = await Business.findById(req.business._id);
                    business.services = business.services.filter(srv => srv !== req.params.serviceId);
                    await business.save();
                    await business.populate({ path: 'services' });
                    res.status(200).json({
                        deletedService: service,
                        businessServices: business.services
                    });
                } else next({
                    status: 403,
                    message: 'un authorized request you cannot change service that is not yours'
                })
            } else next({
                status: 402,
                message: `non valid request`
            })
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    },
    // after front end implementation of editorJS
    async createPost(req, res, next) {
        try {

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    // after front end implementation of editorJS
    async removePost(req, res, next) {
        try {

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    async getCostumers(req, res, next) {
        try {
            const business = await await Business.findById(req.params.businessId).populate({
                path: 'costumers', populate: [
                    { path: 'firstName' },
                    { path: 'lastName' },
                    { path: 'email' },
                    { path: 'image' }
                ]
            })
            res.status(200).json(business);
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }

    },
    async addTag(req, res, next) {
        try {
            if (req.business) {
                await Tag.findOrCreate(req.body.name);
                const business = await Business.updateOne({ _id: req.business._id }, { $push: { tags: req.body.tag } });
                res.status(200).json(business);
            } else next({
                status: 403,
                message: 'unauthorized to add tag to this business'
            })
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    },
    async removeTag(req, res, next) {
        try {
            if (req.business) {
                const business = await Business.updateOne({ _id: req.business._id }, { $pull: { tags: req.body.tag } });
                res.status(200).json(business);
            } else next({
                status: 403,
                message: 'unauthorized to remove tag to this business'
            })
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong, failed to sign-in'
            })
        }
    }
}