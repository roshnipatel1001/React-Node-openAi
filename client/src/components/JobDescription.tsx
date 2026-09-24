import TextField from "@mui/material/TextField";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescription = ({
  value,
  onChange,
}: JobDescriptionProps) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={10}
      label="Job Description"
      placeholder="Paste the job description here..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default JobDescription;