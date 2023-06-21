const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const columnSchema = new Schema({
    title: {
       type: String,
        required: [true, 'Board`s title is required'],
        unique: true,},
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const columnSchemaJoi = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    board: Joi.string().required(),
    tasks: Joi.array().items(Joi.string())
}).options({ abortEarly: false });

const Column = model('column', columnSchema);
columnSchema.post('save', handleMongooseError);

module.exports = {
    Column,
    columnSchemaJoi
};