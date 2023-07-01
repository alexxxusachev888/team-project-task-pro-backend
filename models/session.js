const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
    userId: {   
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Session = model("Session", sessionSchema);

module.exports = Session;