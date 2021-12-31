import { CircularProgress } from "@mui/material";

interface ProgressRingProps {
  percent: number;
  size?: number;
  mb?: boolean;
}

export const ProgressRing = ({
  percent,
  size = 300,
  mb = true,
}: ProgressRingProps) => (
  <CircularProgress
    variant="determinate"
    size={size}
    thickness={6}
    value={percent}
    sx={{ mb: mb ? 2 : 0 }}
  />
);
