const dotenv = require("dotenv");
const cloudinary = require("../config/cloudinaryConfig");
const Company = require("../models/company");

exports.createPosition = async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  //   console.log(image);
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const newPosition = await Company.create({
      name: req.body.name,
      industry: req.body.industry,
      position: req.body.position,
      duration: req.body.duration,
      experience: req.body.experience,
      stipend: req.body.stipend,
      location: req.body.location,
      timings: req.body.timings,
      type: req.body.type,
      endsOn: req.body.endsOn,
      openPositions: req.body.openPositions,
      totalApplicants: req.body.totalApplicants,
      skills: req.body.skills,
      aboutUs: req.body.aboutUs,
      requirements: [req.body.requirements],
      responsibilities: [req.body.responsibilities],
      image: image.secure_url,
      cloudinary_id: image.public_id,
    });
    await newPosition.save();
    res.status(200).json({
      status: "success",
      company: newPosition,
    });
    return;
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(500).json({
        status: "error",
        message: "No company found",
      });
    }
    res.status(200).json({
      status: "success",
      company: company,
    });
    return;
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.filterCompany = async (req, res) => {
  try {
    const { position, skills, minDuration, maxDuration } = req.body;

    const filter = {};

    if (position && position.length > 0) {
      filter.$or = [{ position: { $in: position } }];
    }

    if (skills && skills.length > 0) {
      if (filter.$or) {
        filter.$or.push({ skills: { $in: skills } });
      } else {
        filter.$or = [{ skills: { $in: skills } }];
      }
    }

    if (minDuration !== undefined && maxDuration !== undefined) {
      filter.duration = { $gte: minDuration, $lte: maxDuration };
    } else if (minDuration !== undefined) {
      filter.duration = { $gte: minDuration };
    } else if (maxDuration !== undefined) {
      filter.duration = { $lte: maxDuration };
    }

    const filteredCompanies = await Company.find(filter);

    res.status(200).json({
      status: "success",
      data: filteredCompanies,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      status: "success",
      companies: companies,
    });
    return;
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCompanyByName = async (req, res) => {
  try {
    const companyName = req.params.name.toLowerCase();
    const company = await Company.findOne({
      name: { $regex: new RegExp("^" + companyName, "i") },
    });
    if (!company) {
      return res.status(500).json({
        status: "error",
        message: "No company found",
      });
    }
    res.status(200).json({
      status: "success",
      company: [company],
    });
    return;
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
