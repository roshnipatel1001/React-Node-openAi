const gemini = require("../config/gemini");

const analyzeResume = async (
  resumeText,
  jobDescription
) => {
  const prompt = `
You are an expert technical recruiter.

Analyze the candidate's resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

The JSON must follow exactly this structure:

{
  "matchPercentage": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "experienceMatch": "",
  "suggestions": [],
  "interviewQuestions": []
}

Rules:

- matchPercentage must be a number between 0 and 100.
- matchingSkills must be an array of strings.
- missingSkills must be an array of strings.
- experienceMatch must be a short explanation.
- suggestions must be an array of strings.
- interviewQuestions must be an array of strings.
- Do not add markdown.
- Do not add explanations outside JSON.
`;

  const response = await gemini.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
  },
});

  const text = response.text;

  return JSON.parse(text);
};

module.exports = {
  analyzeResume,
};