const Tag = require('../models/Tag');

module.exports = {
    async getAllTags(res, next) {
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
};
