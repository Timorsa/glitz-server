const passport = require('passport');
const { Router } = require('express');
// validation tools
const { check, validationResult } = require('express-validator');

const userCtrl = require('../controllers/userCtrl');
const { passwordRegex } = require('../utils/general');

const router = Router();


/* 
*   @route POST api/user/sign-in
*   @desc sign-in into the system
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
            userCtrl.signIn(req, res); // go to next
        }
    }
);

/* 
*   @route POST api/user/sign-up
*   @desc sign-up into the system
*   @access public
!   need to add regex for password
*/
router.post('/sign-up',
    [check('email').isEmail().withMessage('Please Enter a Valid Email.')],
    (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            var errorResponse = errors.array({ onlyFirstError: true });
            res.status(422).json({ error: errorResponse[0].msg });
        } else {
            userCtrl.signUp(req, res); // go to next
        }
    }
);

/* 
*   @route POST api/user/edit
*   @desc sign-up into the system
*   @access 
*/
router.post('/edit', userCtrl.update);

module.exports = router;



