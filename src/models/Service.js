const { Schema, model } = require('mongoose');

const schema = {
    business: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    variants: {
        name: String,
        description: String,
        price: Number
    },
    starterPrice: Number,
}

const service_schema = new Schema(schema, { collection: 'schema' });

const Service = model('service', service_schema);

module.exports = Service;