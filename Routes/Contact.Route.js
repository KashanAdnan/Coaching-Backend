const express = require("express");
const ContactController = require("../Controller/Contact.Controller");
const {
  isAuthenticateUser,
  authorizeRole,
  isAuthenticateStudent,
} = require("../Middleware/Authentication.js");

const ContactRoute = express.Router();
ContactRoute.post(
  "/register",
  isAuthenticateUser,ContactController.registerContact
);
ContactRoute.put("/contact/update", ContactController.updateContact);
ContactRoute.get(
  "/admin/Contact/:id",
  authorizeRole("admin"),
  ContactController.getSingleContact
);
ContactRoute.get(
  "/admin/Contacts",
  authorizeRole("admin"),
  ContactController.getAllContacts
);
ContactRoute.delete(
  "/admin/Contact/:id",
  authorizeRole("admin"),
  ContactController.DeleteContact
);
module.exports = ContactRoute;
