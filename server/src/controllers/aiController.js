const pdfParse = require("pdf-parse");

const {
  analyzeResume,
} = require("../services/openaiService");

const analyzeResumeController = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);

    const resumeText = pdfData.text;

    if (!resumeText.trim()) {
      return res.status(400).json({
        message: "Could not extract text from PDF",
      });
    }

    console.log("Resume text extracted successfully");

    const result = await analyzeResume(
      resumeText,
      jobDescription
    );

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
    });
  }
};

module.exports = {
  analyzeResumeController,
};