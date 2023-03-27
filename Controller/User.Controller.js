const { UserModel } = require("../Models/User.Model");
const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendToken = require("../Utils/Send.Token");

const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, Address, dob, phone } = req.body;
  const User = await UserModel.create({
    name,
    Address,
    phone,
    dob,
    email,
    password,
    avatar: req.body.avatar,
  });
  sendToken(User, 201, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }
  sendToken(user, 200, res);
});

const Logout = catchAsyncError(async (req, res, next) => {
  res.cookie("Token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logout Succesfull",
  });
});
const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:4000/api/v1/password/reset/${resetToken}`;
  const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have norequested this email then please ignore it`;
  try {
    await SendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      succes: true,
      message: `Email Sent to ${user.email} succesfully !`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Reset Pasword Token has Expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
const getUserDeteails = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.redirect("/Login");
  }
  res.status(200).json({
    success: true,
    user,
  });
});
const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select("+password");
  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old Password is Incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
const updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
  };
  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    user,
  });
});
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    succes: true,
    users,
  });
});
const getSingleUser = catchAsyncError(async (req, res, next) => {
  const users = await UserModel.findById(req.params.id);
  if (!users) {
    return next(
      new ErrorHandler(`User Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    users,
  });
});
const updateRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
  };
  const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    user,
  });
});
const DeleteUser = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await user.remove();
  res.status(200).json({
    succes: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  Logout,
  forgetPassword,
  resetPassword,
  getUserDeteails,
  updatePassword,
  updateUser,
  getAllUsers,
  getSingleUser,
  updateRole,
  DeleteUser,
};
