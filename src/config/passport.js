// @ts-nocheck
/***********************************
    *
    * 
    *   * passport configuration:  
    *   * costume strategy
    *
    * 
***********************************/
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/User');
const Business = require('../models/Business');


const keys = require('./keys');

const config = {} // ? config options for passport
config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
config.secretOrKey = keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(config, (jwt_payload, done) => {
            if (jwt_payload && jwt_payload.user && jwt_payload.user._id) {
                User.findById(jwt_payload.user._id)
                    .then(user => {
                        if (user !== null) {
                            user.lastTimeOnline = Date.now();
                            user.save().then(() => {
                                // ? done(errors, user/false)  
                                return user ?
                                    done(null, user) :  // user found null  errors
                                    done(null, false)   // did nor found user
                            })
                        } else {
                            done(null, false)   // did nor found user
                        }


                    })
                    .catch(err => console.log(err))
            } else if (jwt_payload && jwt_payload.business && jwt_payload.business._id) {
                Business.findById(jwt_payload.business._id)
                    .then(business => {
                        // ? done(errors, business/false)  
                        return business ?
                            done(null, business) :  // business found null  errors
                            done(null, false)   // did nor found business
                    })
                    .catch(err => console.log(err))
            } else {
                return done(null, false); //  no user/business in jwt payload
            }
        })
    )
}
