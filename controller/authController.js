const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeAt: req.body.passwordChangeAt
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. check email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  //2 check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) getting token and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("you are not loggin! please login", 401));
  }

  //2) validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  //3) check if user still exists
  const currentUser=await User.findById(decoded.id)
  if(!currentUser){
    return next(new AppError('The user belongs to this user does not exists'))
  }
  //4)chek if user change password after jwt is issued
   if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User password recently changed! please login again'),401)
   }
 // grant access to protected route
   req.user=currentUser;

  next();
});
