// @ts-nocheck
const passport = require('passport');
const { Route } = require('express');

// validation tools
const { check, validationResult } = require('express-validator');

const businessCtrl = require('../controllers/businessCtrl');
const { passwordRegex } = require('../utils/general');

const router = Router();


/* 
*   @route POST api/business/sign-in
*   @desc sign-in business into the system
*   @access public
*/
router.post('/sign-in',
    [check('email').isEmail().withMessage('Please Enter a Valid Email.')],
    (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            var errorResponse = errors.array({ onlyFirstError: true });
            res.status(422).json({ error: errorResponse[0].msg });
        } else {
            businessCtrl.signIn(req, res); // go to next
        }
    }
);

/* 
*   @route POST api/business/sign-up
*   @desc sign-up new business into the system
*   @access public
*/
router.post('/sign-up',
    [check('email').isEmail().withMessage('Please Enter a Valid Email.'),
    check('password')
        .matches(passwordRegex)
        .withMessage('password should contain at least : 8 characters, 1 capital letter, 1 number and 1 special character')
    ],
    (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            var errorResponse = errors.array({ onlyFirstError: true });
            res.status(422).json({ error: errorResponse[0].msg });
        } else {
            businessCtrl.signUp(req, res); // go to next
        }
    }
);

/* 
*   @route GET api/business/:businessId
*   @desc gets all info on specific business
*   @access public
*/
router.get('/:businessId', businessCtrl.getBusiness);

/* 
*   @route GET api/business/location
*   @desc get business sorted by closest to given geolocation
*   @access public
*   ! to do 
*/
// router.get('/location/:longitude?:latitude)

/* 
*   @route POST api/business/tags
*   @desc returns business by tags
*   @access public
*/
router.post('/tags', businessCtrl.getBusinessByTag);

/* 
*   @route PUT api/business/
*   @desc update user info
*   @access private(business)
*/
router.put('/', passport.authenticate("jwt", { session: false }), businessCtrl.update)

/* 
*   @route POST api/business/services/add
*   @desc add service offering to business
*   @access private(business)
*/
router.post('/services/add', passport.authenticate("jwt", { session: false }), businessCtrl.addService);

/* 
*   @route POST api/business/services/edit/:serviceId
*   @desc edit existing service offered 
*   @access private(business)
*/
router.post('/services/edit/:serviceId', passport.authenticate("jwt", { session: false }), businessCtrl.addService);

/* 
*   @route DELETE api/business/services/delete/:serviceId
*   @desc delete existing service offering
*   @access private(business)
*/
router.delete('/services/delete/:serviceId', passport.authenticate("jwt", { session: false }), businessCtrl.removeService);

/* 
*   @route GET api/business/:businessId/costumers
*   @desc return all costumers signed to the business
*   @access public 
*/
router.get('/costumers/:businessId/costumers', businessCtrl.getCostumers);

/* 
*   @route PUT api/business/tag/add
*   @desc add tag to business
*   @access private(business)
*/
router.put('/tag/add', businessCtrl.addTag);

/* 
*   @route PUT api/business/tag/remove
*   @desc remove tag from business
*   @access private(business)
*/
router.put('/tag/remove', businessCtrl.removeTag);
