

// create appointment 
// get appointments by business 
// get appointments by user 
// edit change time 
// delete appointment 
// @ts-nocheck
const Appointment = require('../models/Appointment');
const Business = require('../models/Business');
const User = require('../models/User');

const { calculateDurationTime } = require('../utils/calculations');
const { cleanEmptyKeys } = require('../utils/general');

/*
*   @func (String, object)
*   @params business id and appointment time/date
*   @desc return boolean
*/
async function checkIfAvailable(businessId, appointment) {
    try {
        const appointments = await Appointment.find({
            business: businessId, day: appointment.day, month: appointment.month, time: {
                hours: {
                    $gt: appointment.timeStart.hours,
                    $lt: appointment.timeEnd.hours
                },
                minutes: {
                    $gt: appointment.timeStart.minutes,
                    $lt: appointment.timeEnd.minutes
                }
            }
        })
        return appointments ? false : true
    } catch (err) {
        throw err;
    }
}

module.exports = {
    async createAppointment(req, res, next) {
        try {
            if (req.user) {
                const { day, month, time, duration, businessId, serviceId } = req.body;
                const isAvailable = checkIfAvailable(businessId, {
                    day,
                    month,
                    timeStart: time,
                    timeEnd: calculateDurationTime(time, duration)
                })

                if (isAvailable) {
                    const appointment = new Appointment({
                        day,
                        time,
                        month,
                        duration,
                        user: req.user._id,
                        service: serviceId,
                        business: businessId,
                    })
                    await appointment.save();
                    res.status(200).json(appointment);
                } else {
                    res.status(500).json({ message: 'cant make appointment already booked' })
                }
            } else {
                next({
                    status: 403,
                    message: 'please sign-in before booking an appointment'
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong'
            })
        }
    },
    async getAppointmentsByBusiness(req, res, next) {
        try {
            const appointments = await Appointment.find({ business: BusinessId }).populate({
                path: 'user', populate: [
                    { path: 'firstName' },
                    { path: 'lastName' },
                    { path: 'phone' },
                    { path: 'image' }]
            });
            if (appointments) {
                res.status(200).json(appointments);
            } else {
                next({
                    status: 500,
                    message: `couldn't find any appointments`
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong'
            })
        }
    },
    async getAppointmentsByUser(req, res, next) {
        try {
            if (req.user) {
                const appointments = await Appointment.find({ user: req.user._id }).populate([{ path: 'service' }, {
                    path: 'business', populate: [
                        { path: 'name' },
                        { path: 'description' },
                        { path: 'email' },
                        { path: 'image' },
                        { path: 'phone' },
                        { path: 'address' }
                    ]
                }]);
                if (appointments)
                    res.status(200).json(appointments)
                else res.status(500).json({ message: 'could not find appointment' })

            } else next({
                status: 402,
                message: 'login to get appointments'
            })

        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong'
            })
        }
    },
    async editAppointment(req, res, next) {
        try {
            if (req.user) {
                const appointment = await Appointment.findOne({ _id: req.params.appointmentId });
                if (req.user._id === appointment.user) {
                    const editedAppointment = await Appointment.updateOne({ _id: req.params.appointmentId }, { $set: { ...cleanEmptyKeys(req.body) } });
                    res.status(200).json(editedAppointment)
                } else next({
                    status: 403,
                    message: 'cant edit not yours appointment'
                });
            } else {
                next({
                    status: 402,
                    message: 'need to sign-in to edit an appointment'
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong'
            })
        }
    },
    async deleteAppointment(req, res, next) {
        try {
            if (req.user) {
                const appointment = await Appointment.findOne({ _Id: req.params.appointmentId });
                if (req.user._id === appointment.user) {
                    const deletedAppointment = await Appointment.deleteOne({ _id: req.params.appointmentId });
                    res.status(200).json(deletedAppointment)
                } else next({
                    status: 403,
                    message: 'cant edit not yours appointment'
                });
            } else {
                next({
                    status: 402,
                    message: 'need to sign-in before deleting appointment'
                })
            }
        } catch (err) {
            next({
                status: 500,
                message: 'Oops! something went wrong'
            })
        }
    }
}
