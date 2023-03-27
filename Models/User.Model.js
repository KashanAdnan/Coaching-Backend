const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      maxLenght: [30, "Name cann't exceed 30 characters"],
      minLenght: [4, "Name Should have more than 4 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please Enter Phone"],
    },
    dob: {
      type: String,
      required: [true, "Please Enter Phone"],
    },
    Address: {
      type: String,
      required: [true, "Please Enter Phone"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minLenght: [8, "Password Should have greater than 8 characters"],
      select: false,
    },
    avatar: {
      type: String,
      default: "No Image",
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "5d",
  });
};
UserSchema.methods.comparePassword = async function (EnteredPassword) {
  return await bcrypt.compare(EnteredPassword, this.password);
};
UserSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
const UserModel = mongoose.model("Users", UserSchema);
module.exports = {
  UserModel: UserModel,
};
