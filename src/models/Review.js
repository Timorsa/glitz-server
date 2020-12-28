const { Schema, model } = require('mongoose');

const schema = {
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 0
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'business',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
}

const review_schema = new Schema(schema, { collection: 'reviews' });

const Review = model('review', review_schema);

module.exports = Review;