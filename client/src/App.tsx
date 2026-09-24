import { useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import ResumeInput from "./components/ResumeInput";
import JobDescription from "./components/JobDescription";
import AnalysisResult from "./components/AnalysisResult";

import { analyzeResume } from "./services/aiService";
import type {
  AnalysisResult as AnalysisResultData,
} from "./services/aiService";
function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] =
  useState<AnalysisResultData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError(
        "Please enter both resume and job description."
      );
      return;
    }

    try {
      setError("");
      setResult(null);
      setLoading(true);

      const response = await analyzeResume({
        resumeText,
        jobDescription,
      });

      setResult(response.result);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        AI Resume Analyzer
      </Typography>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Analyze your resume against a job description
        using AI.
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Resume */}
      <Box sx={{ mb: 3 }}>
        <ResumeInput
          value={resumeText}
          onChange={setResumeText}
        />
      </Box>

      {/* Job Description */}
      <Box sx={{ mb: 3 }}>
        <JobDescription
          value={jobDescription}
          onChange={setJobDescription}
        />
      </Box>

      {/* Analyze Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress
                size={24}
                color="inherit"
                sx={{ mr: 1 }}
              />

              Analyzing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>
      </Box>

      {/* Analysis Result */}
      {result && (
        <AnalysisResult result={JSON.stringify(result, null, 2)} />
      )}
    </Container>
  );
}

export default App;