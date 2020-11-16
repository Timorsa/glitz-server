const { Schema, model } = require('mongoose');


//
// ! discount in in % units
// ! need to check regarding mails and payment ver
const schema = {
    business: {
        type: Schema.Types.ObjectId,
        ref: 'business',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    services: {
        type: [Schema.Types.ObjectId],
        ref: 'service'
    },
    discount: {
        type: Number
    },
    billed: {
        type: Boolean,
        default: false
    }
}
const invoice_schema = new Schema(schema, { collection: 'invoices' });

const Invoice = model('invoice', invoice_schema);

module.exports = Invoice;
