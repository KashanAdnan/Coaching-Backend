const { DescModel } = require("../Models/Desc.Model");
const catchAsyncError = require("../Middleware/catch.Async.error");

const registerDesc = catchAsyncError(async (req, res, next) => {
  const { Title, Paragraph, date } = req.body;
  const Desc = await DescModel.create({
    Title,
    Paragraph,
    date,
  });
  res.status(201).send({
    success: true,
    message: "Description Added Succesfully",
  });
});

const updateDesc = catchAsyncError(async (req, res, next) => {
  const { Title, Paragraph, date } = req.body;
  const newDescData = {
    Title,
    Paragraph,
    date,
  };
  const Desc = await DescModel.findByIdAndUpdate(req.params.id, newDescData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    succes: true,
    Desc,
  });
});
const getAllDescs = catchAsyncError(async (req, res, next) => {
  const Descs = await DescModel.find();
  res.status(200).json({
    succes: true,
    Descs,
  });
});
const getSingleDesc = catchAsyncError(async (req, res, next) => {
  const Descs = await DescModel.findById(req.params.id);
  if (!Descs) {
    return next(
      new ErrorHandler(`Desc Doesn't Exits with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    succes: true,
    Descs,
  });
});
const DeleteDesc = catchAsyncError(async (req, res, next) => {
  const Desc = await DescModel.findById(req.params.id);
  if (!Desc) {
    return next(
      new ErrorHandler(`Desc Doesnot Exits with ID : ${req.params.id} `, 400)
    );
  }
  await Desc.remove();
  res.status(200).json({
    succes: true,
    Desc,
  });
});

module.exports = {
  registerDesc,
  updateDesc,
  getAllDescs,
  getSingleDesc,
  DeleteDesc,
};
