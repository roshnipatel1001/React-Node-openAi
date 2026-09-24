const openai = require("../config/openai");

const analyzeResume = async (resumeText, jobDescription) => {
  const response = await openai.responses.create({
    model: "gpt-5",

    input: `
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
`,
  });

  return JSON.parse(response.output_text);
};

module.exports = {
  analyzeResume,
};