const dotenv = require("dotenv");
const cloudinary = require("../config/cloudinaryConfig");
const Company = require("../models/company");

exports.createPosition = async (req, res) => {
  const image = await cloudinary.uploader.upload(req.file.path);
  try {
    const newPosition = await Company.create({
      name: req.name,
      industry: req.industry,
      position: req.position,
      duration: req.duration,
      experience: req.experience,
      stipend: req.stipend,
      location: req.location,
      timings: req.timings,
      type: req.type,
      endsOn: req.endsOn,
      openPositions: req.openPositions,
      totalApplicants: req.totalApplicants,
      skills: req.skills,
      aboutUs: req.aboutUs,
      requirements: req.requirements,
      responsibilities: req.responsibilities,
      image: image.secure_url,
      cloudinary_id: image.public_id,
    });
    await newPosition.save();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
