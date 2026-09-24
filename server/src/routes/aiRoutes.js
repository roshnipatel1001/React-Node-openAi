const express = require("express");

const {
  analyzeResumeController
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/analyze-resume",
  analyzeResumeController
);

module.exports = router;