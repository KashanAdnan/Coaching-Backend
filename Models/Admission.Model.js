const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";

const AdmissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  ContactPhone: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  placeofBirth: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});



AdmissionSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "5h",
  });
};

const AdmissionModel = mongoose.model("Admission", AdmissionSchema);

module.exports = {
  AdmissionModel: AdmissionModel,
};
