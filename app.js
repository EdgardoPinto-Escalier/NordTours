const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

///////////////////////////////////
///// GENERAL MIDDLEWARES
///////////////////////////////////
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // Serving static files

// Custom Middleware
app.use((req, res, next) => {
  console.log('Hello from the Middleware');
  next();
});

// Mount Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

