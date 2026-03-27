const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync.js");

exports.allUsers = catchAsync(async (req, res) => {
  const users= await User.find();

  res.status(500).json({
    status: "success",
    results:users.length,
    data:{
      users
    },
  });
});

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