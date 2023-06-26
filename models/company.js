const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    enum: ["Full time", "Part time"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Work from home", "In office"],
    required: true,
  },
  endsOn: {
    type: String,
    required: true,
  },
  openPositions: {
    type: String,
    required: true,
  },
  totalApplicants: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  aboutUs: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  cloudinaryId: String,
  image: String,
});

const company = mongoose.model("company", companySchema);
module.exports = company;
