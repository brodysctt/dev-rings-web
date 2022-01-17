import { CircularProgress } from "@mui/material";
import { CompletedRing } from "components";

interface Props {
  values: [number, number];
  size?: number;
}

export const ProgressRing = ({ values, size = 300 }: Props) => {
  const [actual, goal] = values;
  if (actual >= goal) return <CompletedRing size={size} />;
  return (
    <CircularProgress
      variant="determinate"
      size={size}
      thickness={6}
      value={(actual / goal) * 100}
      sx={{ mb: 2 }}
    />
  );
};
