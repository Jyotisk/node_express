const crypto = require("crypto");
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
  role: {
    type: String,
    type: String,
    enam: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
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
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  // only run if password is modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  //delete password confirm field
  this.passwordconfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changeTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changeTimestamp;
  }
  //false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    console.log({resetToken},this.passwordResetToken);
    

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
