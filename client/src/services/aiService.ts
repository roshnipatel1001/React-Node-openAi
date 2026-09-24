export interface AnalyzeResumeRequest {
  resumeText: string;
  jobDescription: string;
}

export interface AnalysisResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  experienceMatch: string;
  suggestions: string[];
  interviewQuestions: string[];
}

export interface AnalyzeResumeResponse {
  success: boolean;
  result: AnalysisResult;
  message?: string;
}

export const analyzeResume = async (
  data: AnalyzeResumeRequest
): Promise<AnalyzeResumeResponse> => {
  const response = await fetch(
    "http://localhost:5000/api/ai/analyze-resume",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return response.json();
};