const {
  Board,
  boardCreateSchema,
  boardUpdateSchema,
  boardSchema,
} = require('./board');
const { Column, columnSchemaJoi, columnUpdateSchemaJoi } = require('./column');
const { Task, taskSchemaJoi, taskUpdateSchemaJoi } = require('./task');
const { User, userSchemaJoi } = require('./user');
const { sendEmail, sendEmailSchemaJoi } = require('./sendEmail');
const { MiniImg, miniImgSchema } = require('./miniImages');
const { Background, backgroundSchema } = require('./background');
const { Session } = require('./session');

module.exports = {
  Board,
  boardCreateSchema,
  boardUpdateSchema,
  boardSchema,
  Column,
  columnSchemaJoi,
  columnUpdateSchemaJoi,
  Task,
  taskSchemaJoi,
  User,
  userSchemaJoi,
  sendEmail,
  sendEmailSchemaJoi,
  taskUpdateSchemaJoi,
  MiniImg,
  miniImgSchema,
  Background,
  backgroundSchema,
  Session,
};
