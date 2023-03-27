const sendStudentToken = (Student, statusCode, res) => {
  const token = Student.getJWTToken();

  // Options for Cookie
  const option = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("StudentToken", token, option).json({
    succes: true,
    Student,
    token,
  });
};

module.exports = sendStudentToken;
