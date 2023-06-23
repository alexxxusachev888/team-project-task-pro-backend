const { Schema, model } = require('mongoose');

const boardTestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Board`s title is required'],
      unique: true,
    },
    iconId: {
      type: String,
      required: [true, 'Board`s icons ID is required'],
    },
    backgroundId: {
      type: String,
      required: [true, 'Board`s background ID is required'],
    },
    owner: {
      //   type: Schema.Types.ObjectId,
      type: String,
      ref: 'user',
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        // type: String,
        ref: 'columntest',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const columnTestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Board`s title is required'],
      unique: true,
    },
    boards: {
      //   type: Schema.Types.ObjectId,
      type: String,
      ref: 'boardtest',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        // type: String,
        ref: 'tasktest',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const taskTestSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task`s title is required'],
    },
    description: {
      type: String,
      required: [true, 'Task`s description is required'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Without'],
      required: [true, 'Task`s priority is required'],
      //   default: "Without",
    },
    deadline: {
      type: Date,
      required: [true, 'Task`s deadline is required'],
      min: Date.now(),
      //   default: Date.now(),
    },
    status: {
      type: String,
      enum: ['in progress', 'done'],
      required: [true, 'Task`s status is required'],
    },
    boards: {
      //   type: Schema.Types.ObjectId,
      type: String,
      ref: 'boardtest',
    },
    columns: {
      //   type: Schema.Types.ObjectId,
      type: String,
      ref: 'columntest',
    },
  },
  { versionKey: false, timestamps: true }
);

const BoardTest = model('boardtest', boardTestSchema);
const ColumnTest = model('columntest', columnTestSchema);
const TaskTest = model('tasktest', taskTestSchema);

module.exports = { BoardTest, ColumnTest, TaskTest };
