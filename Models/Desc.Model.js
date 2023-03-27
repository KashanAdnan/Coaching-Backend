const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Paragraph: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const DescModel = mongoose.model("Description", DescriptionSchema);

module.exports = {
  DescModel: DescModel,
};
