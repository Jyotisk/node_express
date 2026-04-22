const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

exports.allUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(500).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = (req, res, next) => {
  //1) create an error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This error is not for password update. please use /updatePassword.",
      ),
      400,
    );
  }
  //2) update user document
  res.status(200).json({
    staus: "success",
  });
};

exports.getUsers = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "users not available",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "users not available",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "users not available",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    message: "users not available",
  });
};
