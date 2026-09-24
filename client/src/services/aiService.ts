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
  resume: File,
  jobDescription: string
): Promise<AnalyzeResumeResponse> => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(
    "http://localhost:5000/api/ai/analyze-resume",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return response.json();
};