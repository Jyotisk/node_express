const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

const filterObj= (obj, ...allowedFields)=>{
  const newObj={};
  Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el)) newObj[el]=obj[el];
  });
  return newObj;
}
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

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create an error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This error is not for password update. please use /updatePassword.",
      ),
      400,
    );
  }
  //2) body.role:'admin' filter filfillds that are not required
  const filterBody=filterObj(req.body,'name','email');
  
  //2) update user document
  const updatedUser=await User.findByIdAndUpdate(req.user.id,filterBody, {
    new:true,
    runValidators:true
  });

  res.status(200).json({
    staus: "success",
    data:{
      user:updatedUser
    }
  });
});

exports.deleteMe=catchAsync(async (req,res,next)=>{
  await User.findByIdAndUpdate(req.user.id,{active:false});
  res.status(204).json({
    status:'success',
    data:null
  })
})

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
