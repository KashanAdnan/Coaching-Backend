const ErrorHandler = require("../Utils/Error.Handler");
const catchAsyncError = require("./catch.Async.error");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.Model.js");
const { AdmissionModel } = require("../Models/Admission.Model.js");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    return next(
      new ErrorHandler(
        `You Are Not Allowed`,
        400
      )
    );
  } else {
    const decodedData = jwt.verify(token, JWTSecret);
    req.user = await UserModel.findById(decodedData.id);
  }
  next();
});
exports.isAuthenticateStudent = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.StudentToken;
  if (!token) {
    return next(new ErrorHandler(`
    You Are Not a Student
    <a href="/Student">Register as a Student</a>
    `, 400));
  } else {
    const decodedData = jwt.verify(token, JWTSecret);
    req.Student = await AdmissionModel.findById(decodedData.id);
  }
  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not Allowed to use this resource`,
          400
        )
      );
    }
    next();
  };
};
