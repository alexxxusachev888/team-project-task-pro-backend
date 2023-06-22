const { Board, boardCreateSchema, boardUpdateSchema, boardSchema } = require('./board');
const { Column, columnSchemaJoi } = require('./column');
const { Task, taskSchemaJoi } = require('./task');
const { User, userSchemaJoi } = require('./user');
const { sendEmail, sendEmailSchemaJoi } = require('./sendEmail');

module.exports = {
    Board,
    boardCreateSchema,
    boardUpdateSchema,
    boardSchema,
    Column,
    columnSchemaJoi,
    Task,
    taskSchemaJoi,
    User,
    userSchemaJoi,
    sendEmail,
    sendEmailSchemaJoi,
  };