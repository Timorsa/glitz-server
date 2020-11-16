const { Schema, model } = require("mongoose");

// defining the schema object
const schema = {
    name: {
        type: String,
        require: true,
        unique: true,
    },
};

// initialize the tag schema attach to tag collection
const tagSchema = new Schema(schema, { collection: "tags" });


//findOrCreate
tagSchema.statics.findOrCreate = async (conditions) => {
    let document = await Tag.findOne(conditions);
    return document || (await new Tag({ ...conditions }).save());
};

const Tag = model("tag", tagSchema);

module.exports = Tag;
