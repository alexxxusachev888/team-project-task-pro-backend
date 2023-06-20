const { Schema } = require('mongoose');
const Joi = require('joi');
const { errorMessages } = require('../helpers');

const taskSchema = new Schema({
    title: String,
    task: String,
    priority: String,
    deadline: Date,
    status: String
  }, {_id: false}); 
  
  const columnSchema = new Schema({
    title: String,
    tasks: [taskSchema]
  }, {_id: false});
  
  const boardSchema = new Schema({
    title: String,
    icon: String,
    background: String,
    columns: [columnSchema]
  }, {_id: false});

const taskSchemaJoi = Joi.object({
    title: Joi.string().min(2).max(100).required().messages(errorMessages('title')),
    task: Joi.string().min(2).max(500).required().messages(errorMessages('task')),
    priority: Joi.string().valid('showAll','withoutPriority', 'low', 'medium', 'high').required().messages(errorMessages('priority')),
    deadline: Joi.date().iso().required().messages(errorMessages('deadline')),
    status: Joi.string().valid('in progress', 'done').required().messages(errorMessages('status')),
  }).options({ abortEarly: false });
  
  const columnSchemaJoi = Joi.object({
    title: Joi.string().min(2).max(100).required().messages(errorMessages('title')),
    tasks: Joi.array(),
  }).options({ abortEarly: false });
  
  const boardSchemaJoi = Joi.object({
    title: Joi.string().min(2).max(100).required().messages(errorMessages('title')),
    icon: Joi.string().required().messages(errorMessages('icon')),
    background: Joi.string().required().messages(errorMessages('background')),
    columns: Joi.array(),
  }).options({ abortEarly: false });

module.exports = {
      boardSchema,
      taskSchemaJoi,
      columnSchemaJoi,
      boardSchemaJoi
  };