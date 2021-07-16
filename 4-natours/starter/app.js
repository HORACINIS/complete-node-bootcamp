const express = require('express');
// const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1.- MIDDLEWARES

app.use(morgan('dev'));
// This is called middlewear as it stands in between the request and the response
// This is needed to modify the incoming request data
app.use(express.json());

// creating our own middleware function
app.use((req, res, next) => {
  console.log('Hello from the middleware☹️');
  next();
});

// here is another middleware function, to manipulate the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// yet another middleware - this one I'll delete after, it's just for practicing
app.use((req, res, next) => {
  req.myFullName = 'Horacio Alejandro Moran Espinoza'
  next();
});




// 3.- ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;