const express = require("express");

const {
  analyzeResumeController,
} = require("../controllers/aiController");

const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/analyze-resume",
  upload.single("resume"),
  analyzeResumeController
);

module.exports = router;