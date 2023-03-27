const express = require("express");
const AdmissionControler = require("../Controller/Admission.Controller");
const {
  isAuthenticateUser,
  authorizeRole,
  isAuthenticateStudent,
} = require("../Middleware/Authentication.js");

const AdmissionRoute = express.Router();
AdmissionRoute.post("/register", AdmissionControler.registerStudent);
AdmissionRoute.post("/login", AdmissionControler.loginStudent);
AdmissionRoute.get("/logout", AdmissionControler.Logout);
AdmissionRoute.get("/me",isAuthenticateStudent, AdmissionControler.getStudentDeteails);
AdmissionRoute.put("/me/update", AdmissionControler.updateStudent);
AdmissionRoute.get(
  "/admin/Admission/:id",
  authorizeRole("admin"),
  AdmissionControler.getSingleStudent
);
AdmissionRoute.get(
  "/admin/Admissions",
  authorizeRole("admin"),
  AdmissionControler.getAllStudents
);
AdmissionRoute.delete(
  "/admin/Admission/:id",
  authorizeRole("admin"),
  AdmissionControler.DeleteStudent
);
AdmissionRoute.put(
  "/admin/Admission/:id",
  authorizeRole("admin"),
  AdmissionControler.updateRole
);
module.exports = AdmissionRoute;
