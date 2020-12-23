// ? Blog post from EditorJS and it's data
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
    date: {
        type: Date,
        default: Date.now()
    }
}

const message_schema = new Schema(schema, { collation: 'messages' });

const Message = model('message', message_schema);

module.exports = Message;



