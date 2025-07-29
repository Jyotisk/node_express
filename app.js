const express = require("express");
const app = express();
const tourRouter = require('./routes/tourRouts')
const userRouter = require('./routes/userRouts');
const morgan = require("morgan");

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(`${__dirname}/public`))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

module.exports = app;
