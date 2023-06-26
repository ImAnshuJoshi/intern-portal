const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createPosition } = require("../controllers/companyController");

router.post("/createposition", upload.single("image"), createPosition);

module.exports = router;
