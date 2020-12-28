const { Schema, model } = require("mongoose");

const schema = {
    name: {
        type: String,
        require: true,
        unique: true,
    },
};

const tagSchema = new Schema(schema, { collection: "tags" });

//findOrCreate method
tagSchema.statics.findOrCreate = async (conditions) => {
    let document = await Tag.findOne(conditions);
    return document || (await new Tag({ ...conditions }).save());
};

const Tag = model("tag", tagSchema);

module.exports = Tag;
