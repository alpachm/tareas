const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usersRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', (req, res, next) =>
  next(new AppError(`The route ${req.originalUrl} was not found`, 404))
);

app.use(globalErrorHandler);

module.exports = app;
