// @ts-nocheck
const Review = require('../models/Review');

module.exports = {
    async createReview(req, res, next) {
        try {
            if (req.user) {
                const { title, description, rating, businessId } = req.body;
                const review = new Review({
                    user: req.user._id,
                    business: businessId,
                    title,
                    description,
                    rating
                })
                await review.save();
                res.status(200).json(review);
            } else {
                next({
                    status: 403,
                    message: 'only signed in user can write reviews'
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong , failed to sign-up.',
            })
        }
    },
    async getReviewsByBusiness(req, res, next) {
        try {
            const reviews = await Review.find({ business: req.params.businessId });
            if (reviews)
                res.status(200).json(reviews);
            else res.status(402).json({ message: `couldn't find any user reviews` });
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong , failed to sign-up.',
            })
        }
    },
    async getReviewsByUser(req, res, next) {
        try {
            const reviews = await Review.find({ user: req.params.userId });
            if (reviews)
                res.status(200).json(reviews);
            else res.status(402).json({ message: `couldn't find any user reviews` });

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong , failed to sign-up.',
            })
        }
    },
    async deleteReview(req, res, next) {
        try {
            if (req.user) {
                const review = await Review.findById({ _id: req.params.reviewId });
                if (req.user._id.toString() == review.user) {
                    const deletedReview = await Review.deleteOne({ _id: req.params.reviewId });
                    res.status(200).json(deletedReview)
                } else {
                    next({
                        status: 403,
                        message: `you can delete only reviews that were made by you`
                    })
                }
            } next({
                status: 403,
                message: 'no signed in user'
            })
        } catch (err) {
            console.log(err)
            next({
                status: 500,
                message: 'Oops! something went wrong , failed to sign-up.',
            })
        }
    }
}
