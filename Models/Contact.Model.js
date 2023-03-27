var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

var ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = {
  ContactModel: ContactModel,
};
