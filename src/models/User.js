const { model, Schema } = require('mongoose');

// defining the schema object
const schema = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    lastTimeOnline: {
        type: Date,
        default: Date.now()
    }
}

// initialize the user schema to user collection
const user_schema = new Schema(schema, { collection: 'users' });
// initialize user model 
const User = model('user', user_schema);

module.exports = User;