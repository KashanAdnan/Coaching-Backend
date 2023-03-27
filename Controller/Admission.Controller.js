const { AdmissionModel } = require("../Models/Admission.Model");
const catchAsyncError = require("../Middleware/catch.Async.error");
const sendStudentToken = require("../Utils/Send.Student.Token");

const registerStudent = catchAsyncError(async (req, res, next) => {
  const { studentName, age, email, placeofBIrth, adress, nationality, level } =
    req.body;
  const Student = await AdmissionModel.create({
    studentName: studentName,
    age: age,
    email: email,
    ContactPhone: ContactPhone,
    adress: adress,
    nationality: nationality,
    placeofBIrth: placeofBIrth,
    level: level,
  });
  sendStudentToken(Student, 201, res);
});

const loginStudent = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email ", 400));
  }
  const Student = await AdmissionModel.findOne({ email });
  if (!Student) {
    return next(new ErrorHandler("Invalid email ", 401));
  }
  sendStudentToken(Student, 200, res);
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
const getStudentDeteails = catchAsyncError(async (req, res, next) => {
  const Student = await AdmissionModel.findById(req.Student.id);
  if (!Student) {
    res.redirect("/Login");
  }
  res.status(200).json({
    success: true,
    Student,
  });
});
const updateStudent = catchAsyncError(async (req, res, next) => {
  const { studentName, age, email, placeofBIrth, adress, nationality, level } =
    req.body;
  const newStudentData = {
    studentName: studentName,
    age: age,
    email: email,
    ContactPhone: ContactPhone,
    adress: adress,
    nationality: nationality,
    placeofBIrth: placeofBIrth,
    level: level,
  };
  const Student = await AdmissionModel.findByIdAndUpdate(
    req.Student.id,
    newStudentData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Student,
  });
});
const getAllStudents = catchAsyncError(async (req, res, next) => {
  const Students = await AdmissionModel.find();
  res.status(200).json({
    succes: true,
    Students,
  });
});
const getSingleStudent = catchAsyncError(async (req, res, next) => {
  const Students = await AdmissionModel.findById(req.params.id);
  if (!Students) {
    return next(
      new ErrorHandler(`Student Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Students,
  });
});
const updateRole = catchAsyncError(async (req, res, next) => {
  const newStudentData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
  };
  const Student = await AdmissionModel.findByIdAndUpdate(
    req.params.id,
    newStudentData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Student,
  });
});
const DeleteStudent = catchAsyncError(async (req, res, next) => {
  const Student = await AdmissionModel.findById(req.params.id);
  if (!Student) {
    return next(
      new ErrorHandler(`Student Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Student.remove();
  res.status(200).json({
    succes: true,
    Student,
  });
});

module.exports = {
  registerStudent,
  loginStudent,
  Logout,
  getStudentDeteails,
  updateStudent,
  getAllStudents,
  getSingleStudent,
  updateRole,
  DeleteStudent,
};
