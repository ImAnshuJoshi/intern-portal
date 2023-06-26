const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  createPosition,
  getCompany,
  filterCompany,
  getAllCompanies,
  getCompanyByName,
} = require("../controllers/companyController");

router.post("/createposition", upload.single("image"), createPosition);
router.get("/:id", getCompany);
router.post("/filter/", filterCompany);
router.get("/", getAllCompanies);
router.get("/getcompanybyname/:name", getCompanyByName);

module.exports = router;
