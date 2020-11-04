import { model, Schema } from 'mongoose';
import { roleTypes } from '../config/constants';

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
    role: {
        type: String,
        enum: roleTypes,
        default: 'free'
    },
    lastTimeOnline: {
        type: Date,
        default: Date.now()
    }
}

// initialize the user schema to user collection
const user_schema = new Schema(schema, { collection: 'user' });
// initialize user model 
const User = model('user', user_schema);

export default User;