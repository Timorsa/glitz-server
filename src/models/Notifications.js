const { model, Schema } = require('mongoose');

// definition 
const schema = {
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}

const notification_schema = new Schema(schema, { collection: 'notifications' });

const Notification = model('notification', notification_schema);

module.exports = Notification;



