// @ts-ignore
const Tag = require('../models/Tag');

module.exports = {
    // @ts-ignore
    async getAllTags(req, res, next) {
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
        } catch (err) {
            next({
                status: 500,
                message: "Oops! something went wrong , failed to retrieve tags. ",
            });
        }
    },
    // @ts-ignore
    async createTag(req, res, next) {
        try {
            const doc = Tag.findOrCreate({ name: req.name })
            res.status(200).json(doc);
        } catch (err) {
            next({
                status: 500,
                message: "Oops! something went wrong , failed to retrieve tags. ",
            });
        }
    }
};
