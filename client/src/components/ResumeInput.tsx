import TextField from "@mui/material/TextField";

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ResumeInput = ({
  value,
  onChange,
}: ResumeInputProps) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={10}
      label="Resume"
      placeholder="Paste your resume here..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default ResumeInput;