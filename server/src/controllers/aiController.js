const {
  analyzeResume
} = require("../services/openaiService");

const analyzeResumeController = async (req, res) => {
  try {
    const {
      resumeText,
      jobDescription
    } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        message: "Resume and job description are required"
      });
    }

    const result = await analyzeResume(
      resumeText,
      jobDescription
    );

    res.json({
      success: true,
      result
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed"
    });
  }
};

module.exports = {
  analyzeResumeController
};