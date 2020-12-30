const { model, Schema } = require('mongoose');

// ! not implemented yet
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
    date: {
        type: Date,
        default: Date.now()
    }
}

const message_schema = new Schema(schema, { collection: 'messages' });

const Message = model('message', message_schema);

module.exports = Message;



