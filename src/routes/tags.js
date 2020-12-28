const { Router } = require('express');
const router = Router();

// tag controller 
const tagCtrl = require('../controllers/tagCtrl');

/*
*   @route GET api/tags
*   @desc gets all the tags in the system
*   @access public
*/
router.get('/', tagCtrl.getAllTags);

/*
*   @route POST api/tags/create
*   @desc creates new tag if doesn't exist
*   @access public
*/
router.post('/create', tagCtrl.createTag);

module.exports = router;