import { useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

import JobDescription from "./components/JobDescription";
import AnalysisResult from "./components/AnalysisResult";

import { analyzeResume } from "./services/aiService";

import type {
  AnalysisResult as AnalysisResultData,
} from "./services/aiService";

function App() {
  const [resumeFile, setResumeFile] =
    useState<File | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState<AnalysisResultData | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "File size must be less than 5 MB."
      );
      setResumeFile(null);
      return;
    }

    setError("");
    setResumeFile(file);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError(
        "Please upload your resume PDF."
      );
      return;
    }

    if (!jobDescription.trim()) {
      setError(
        "Please enter the job description."
      );
      return;
    }

    try {
      setError("");
      setResult(null);
      setLoading(true);

      const response = await analyzeResume(
        resumeFile,
        jobDescription
      );

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
    <Container
      maxWidth="md"
      sx={{ py: 5 }}
    >
      {/* Page Header */}

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
        Upload your resume and compare it
        with a job description using AI.
      </Typography>

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Resume Upload */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Upload Resume
        </Typography>

        <Button
          variant="outlined"
          component="label"
        >
          Choose PDF Resume

          <input
            type="file"
            hidden
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />
        </Button>

        {resumeFile && (
          <Typography
            variant="body2"
            sx={{ mt: 2 }}
          >
            Selected file:{" "}
            <strong>
              {resumeFile.name}
            </strong>
          </Typography>
        )}
      </Paper>

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
        <AnalysisResult
          result={result}
        />
      )}
    </Container>
  );
}

export default App;