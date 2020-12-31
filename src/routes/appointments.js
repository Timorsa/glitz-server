// @ts-nocheck
const passport = require('passport');
const { Router } = require('express');

const appointmentCtrl = require('../controllers/appointmentCtrl');

const router = Router();

/*
*   @route POST api/appointment/create
*   @desc create new appointment 
*   @access private(user)
*/
router.post('/create', [passport.authenticate("jwt", { session: false })], appointmentCtrl.createAppointment);

/*
*   @route GET api/appointment/business/:businessId
*   @desc gets appointments by business
*   @access public
*/
router.get('/business/:businessId', appointmentCtrl.getAppointmentsByBusiness);

/*
*   @route GET api/appointment/user
*   @desc get user appointments
*   @access private(user)
*/
router.get('/user', [passport.authenticate("jwt", { session: false })], appointmentCtrl.getAppointmentsByUser);

/*
*   @route PUT api/appointment/:appointmentId
*   @desc edit appointment
*   @access private(user)
*/
router.put('/:appointmentId', [passport.authenticate("jwt", { session: false })], appointmentCtrl.editAppointment);

/*
*   @route DELETE api/appointment/delete/:appointmentId
*   @desc delete user appointments
*   @access private(user)
*/
router.delete('/delete/:appointmentId', [passport.authenticate("jwt", { session: false })], appointmentCtrl.deleteAppointment);

module.exports = router;