const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    validate: [validator.isEmail, "Please provid a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please comfirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  // only run if password is modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  //delete password confirm field
  this.passwordconfirm = undefined;
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
