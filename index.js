const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./components/swagger/swagger.json');

const app = express();

const authRouter = require('./routes/auth');
const boardRouter = require('./routes/board');
const columnRouter = require('./routes/column');
const taskRouter = require('./routes/task');
const helpRouter = require('./routes/sendEmail');

// ==============================================
const boardtestRouter = require('./routes/boardTest');
// ==============================================

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', authRouter);
app.use('/api/board', boardRouter);
app.use('/api/column', columnRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/help', helpRouter);

// ==================================================
app.use('/api/boardtest', boardtestRouter);
// ==================================================

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
