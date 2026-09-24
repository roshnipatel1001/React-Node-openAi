const {
  analyzeResume,
} = require("../services/geminiService");

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

    const pdfjsLib = await import(
      "pdfjs-dist/legacy/build/pdf.mjs"
    );

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(req.file.buffer),
    });

    const pdfDocument = await loadingTask.promise;

    let resumeText = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdfDocument.numPages;
      pageNumber++
    ) {
      const page =
        await pdfDocument.getPage(pageNumber);

      const textContent =
        await page.getTextContent();

      const pageText =
        textContent.items
          .map((item) => item.str)
          .join(" ");

      resumeText += pageText + "\n";
    }

    if (!resumeText.trim()) {
      return res.status(400).json({
        message:
          "Could not extract text from PDF",
      });
    }

    console.log(
      "Resume text extracted successfully"
    );

    const result = await analyzeResume(
      resumeText,
      jobDescription
    );

    res.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(
      "Resume analysis error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResumeController,
};