import CircularProgress from "@mui/material/CircularProgress";
import { AnimatedRing } from "components";

interface Props {
  isIcon?: boolean;
  size?: number;
  values: [number, number]; // TODO: Make optional if isIcon
}

export const ProgressRing = ({ isIcon = false, values, size = 300 }: Props) => {
  const [actual, goal] = values;
  if (actual >= goal) return <AnimatedRing size={size} />;
  return (
    <CircularProgress
      variant="determinate"
      size={isIcon ? 26 : size}
      thickness={isIcon ? 6 : 4}
      value={isIcon ? 100 : (actual / goal) * 100}
      sx={isIcon ? {} : { mb: 2 }}
    />
  );
};
