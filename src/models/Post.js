// ? Blog post from EditorJS and it's data
const { model, Schema } = require('mongoose');

// definition 
const schema = {
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    editorJS: {
        time: {
            type: Date,
            default: Date.now()
        },
        blocks: [{ type: string, data: object }],
        version: string
    },
    tags: {
        type: [String],
        unique: true,
    },
}

const post_schema = new Schema(schema, { collation: 'posts' });

const Post = model('post', post_schema);





