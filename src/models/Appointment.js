// @ts-nocheck
const { model, Schema } = require('mongoose');

// definition 
const schema = {
    day: {
        type: Number,
        min: 1,
        max: 31
    },
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    time: {
        hours: {
            type: Number,
            min: 0,
            max: 23,
        },
        minutes: {
            type: Number,
            min: 0,
            max: 59
        }
    },
    // in minutes
    duration: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'service',
    }
}

const post_schema = new Schema(schema, { collection: 'posts' });

const Post = model('post', post_schema);

module.exports = Post;



