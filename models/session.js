const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: false }
);

const Session = model('session', sessionSchema);

module.exports = {Session};