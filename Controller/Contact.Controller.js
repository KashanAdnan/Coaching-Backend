const { ContactModel } = require("../Models/Contact.Model");
const catchAsyncError = require("../Middleware/catch.Async.error");

const registerContact = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, message } = req.body;
  const Contact = await ContactModel.create({
  firstname,
    lastname,
    email: req.user.email,
    message,
  });
  res.status(201).send({
    succes: true,
    message: "Contact Added SuccesFully!",
  });
});

const updateContact = catchAsyncError(async (req, res, next) => {
    const { firstname, lastname, message } = req.body;
  const newContactData = {
    firstname,
    lastname,
    message,
  };
  const Contact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    newContactData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    succes: true,
    Contact,
  });
});
const getAllContacts = catchAsyncError(async (req, res, next) => {
  const Contacts = await ContactModel.find();
  res.status(200).json({
    succes: true,
    Contacts,
  });
});
const getSingleContact = catchAsyncError(async (req, res, next) => {
  const Contacts = await ContactModel.findById(req.params.id);
  if (!Contacts) {
    return next(
      new ErrorHandler(`Contact Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Contacts,
  });
});
const DeleteContact = catchAsyncError(async (req, res, next) => {
  const Contact = await ContactModel.findById(req.params.id);
  if (!Contact) {
    return next(
      new ErrorHandler(`Contact Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Contact.remove();
  res.status(200).json({
    succes: true,
    Contact,
  });
});

module.exports = {
  registerContact,
  updateContact,
  getAllContacts,
  getSingleContact,
  DeleteContact,
};
