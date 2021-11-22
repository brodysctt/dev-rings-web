import { CircularProgress } from "@mui/material";

interface RingProps {
  goal: number;
  progress: number;
  size?: "full" | "mini";
}

export const Ring = ({ goal, progress, size = "full" }: RingProps) => {
  const percent = (progress / goal) * 100;
  const isFullSize = size === "full";
  return (
    <CircularProgress
      variant="determinate"
      size={isFullSize ? 200 : 40}
      thickness={8}
      value={percent}
    />
  );
};
