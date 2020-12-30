/***
 *  *Boiler plate in case decided to continue with project after the course
 ***/

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}