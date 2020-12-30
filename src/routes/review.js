// @ts-nocheck
const passport = require('passport');
const { Router } = require('express');

const reviewCtrl = require('../controllers/reviewCtrl');

const router = Router();


/*
*   @route POST api/review/create
*   @desc create a review on a business
*   @access private(user)
*/
router.post('/create', [passport.authenticate("jwt", { session: false })], reviewCtrl.createReview);

/*
*   @route GET api/review/business/:businessId
*   @desc get all reviews on a business
*   @access public
*/
router.get('/business/:businessId', reviewCtrl.getReviewsByBusiness);

/*
*   @route GET api/review/user/:userId
*   @desc get all reviews made by a user
*   @access public
*/
router.get('/user/:userId', reviewCtrl.getReviewsByUser)

/*
*   @route DELETE api/delete/:reviewId
*   @desc delete review that the user made 
*   @access private(user)
*/
router.delete('/delete/:reviewId', [passport.authenticate("jwt", { session: false })], reviewCtrl.deleteReview);



module.exports = router;