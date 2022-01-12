import { CircularProgress } from "@mui/material";

interface ProgressRingProps {
  values: [number, number];
  size?: number;
  mb?: boolean;
}

export const ProgressRing = ({
  values,
  size = 300,
  mb = true,
}: ProgressRingProps) => (
  <CircularProgress
    variant="determinate"
    size={size}
    thickness={6}
    value={calcProgress(values)}
    sx={{ mb: mb ? 2 : 0 }}
  />
);

const calcProgress = (values: [number, number]) => {
  const [actual, goal] = values;
  return actual >= goal ? 100 : (actual / goal) * 100;
};
