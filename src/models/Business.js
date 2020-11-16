const { Schema, model } = require("mongoose");


const schema = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        number: Number
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    services: {
        type: [Schema.Types.ObjectId],
        ref: 'service'
    },
    tags: {
        type: [String],
        unique: true,
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'post',
        unique: true
    },
    costumers: {
        type: [Schema.Types.ObjectId],
        ref: 'user',
        unique: true
    }
}

const business_schema = new Schema(schema, { collection: 'businesses' });

const Business = model('business', business_schema);

module.exports = Business;