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
    image: {
        type: String,
        default: 'https://www.muralswallpaper.com/app/uploads/purple-bright-gradient-wallpaper-mural-Plain-820x532.jpg'
    },
    description: {
        type: String,
        required: true
    },
    variants: [{
        name: String,
        description: String,
        price: Number
    }],
    starterPrice: { type: Number, required: true }
}

const service_schema = new Schema(schema, { collection: 'services' });

const Service = model('service', service_schema);

module.exports = Service;