import { CircularProgress } from "@mui/material";

interface ProgressRingProps {
  percent: number;
  mini?: boolean;
}

export const ProgressRing = ({ percent, mini = false }: ProgressRingProps) => (
  <CircularProgress
    variant="determinate"
    size={mini ? 30 : 200}
    thickness={8}
    value={percent}
    sx={{ mb: 2 }}
  />
);
