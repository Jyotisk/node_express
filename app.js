const express = require("express");
const app = express();
const tourRouter = require('./routes/tourRouts');
const userRouter = require('./routes/userRouts');
const morgan = require("morgan");

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

// 🔥 GLOBAL ERROR HANDLER (MUST BE LAST)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

module.exports = app;