const express = require("express");
const app = express();
const tourRouter=require('./routes/tourRouts')
const userRouter=require('./routes/userRouts')
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

module.exports=app;
