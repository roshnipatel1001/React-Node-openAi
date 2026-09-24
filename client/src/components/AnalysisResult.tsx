import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import type { AnalysisResult as AnalysisResultData } from "../services/aiService";

interface AnalysisResultProps {
  result: AnalysisResultData;
}

const AnalysisResult = ({
  result,
}: AnalysisResultProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        AI Resume Analysis
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Match Percentage */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Match Percentage
        </Typography>

        <Typography
          variant="h2"
          fontWeight="bold"
        >
          {result.matchPercentage}%
        </Typography>
      </Box>

      {/* Matching Skills */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Matching Skills
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {result.matchingSkills.map(
            (skill, index) => (
              <Chip
                key={index}
                label={skill}
              />
            )
          )}
        </Box>
      </Box>

      {/* Missing Skills */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Missing Skills
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {result.missingSkills.map(
            (skill, index) => (
              <Chip
                key={index}
                label={skill}
              />
            )
          )}
        </Box>
      </Box>

      {/* Experience Match */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Experience Match
        </Typography>

        <Typography color="text.secondary">
          {result.experienceMatch}
        </Typography>
      </Box>

      {/* Suggestions */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Resume Improvement Suggestions
        </Typography>

        {result.suggestions.map(
          (suggestion, index) => (
            <Typography
              key={index}
              sx={{ mb: 1 }}
            >
              {index + 1}. {suggestion}
            </Typography>
          )
        )}
      </Box>

      {/* Interview Questions */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
        >
          Interview Questions
        </Typography>

        {result.interviewQuestions.map(
          (question, index) => (
            <Typography
              key={index}
              sx={{ mb: 1 }}
            >
              {index + 1}. {question}
            </Typography>
          )
        )}
      </Box>
    </Paper>
  );
};

export default AnalysisResult;