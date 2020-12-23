const { model, Schema } = require('mongoose');

// definition 
const schema = {
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}

const notification_schema = new Schema(schema, { collation: 'notifications' });

const Notification = model('notification', notification_schema);

module.exports = Notification;



