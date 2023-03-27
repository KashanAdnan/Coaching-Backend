const express = require("express");
const DescController = require("../Controller/Desc.Controller");
const {
  isAuthenticateUser,
  authorizeRole,
  isAuthenticateStudent,
} = require("../Middleware/Authentication.js");

const DescRoute = express.Router();
DescRoute.post("/register", isAuthenticateUser, DescController.registerDesc);
DescRoute.put("/contact/update", DescController.updateDesc);
DescRoute.get(
  "/admin/Contact/:id",
  authorizeRole("admin"),
  DescController.getSingleDesc
);
DescRoute.get(
  "/admin/Contacts",
  authorizeRole("admin"),
  DescController.getAllDescs
);
DescRoute.delete(
  "/admin/Contact/:id",
  authorizeRole("admin"),
  DescController.DeleteDesc
);
module.exports = DescRoute;
