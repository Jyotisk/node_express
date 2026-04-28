const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize=require("express-mongo-sanitize")
const xss=require("xss-clean")
const hpp=require('hpp');

const AppError = require("./utils/appError");
const tourRouter = require("./routes/tourRouts");
const userRouter = require("./routes/userRouts");

const app = express();

//1) GLOBAL MIDDLEWARE
// Set Security HTTP headers
app.use(helmet());

//development login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit request from same api
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data Sanitization agaist noSQL query injection
app.use(mongoSanitize());

// // Data sanitization against XSS
// app.use(xss());

//prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration'
  ]
}));
// serving static files
app.use(express.static(`${__dirname}/public`));

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

// HANDLE UNDEFINED ROUTES
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
