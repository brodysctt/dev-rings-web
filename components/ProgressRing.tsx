import { CircularProgress } from "@mui/material";

export const ProgressRing = ({ percent }: { percent: number }) => (
  <CircularProgress
    variant="determinate"
    size={200}
    thickness={8}
    value={percent}
    sx={{ mb: 2 }}
  />
);
