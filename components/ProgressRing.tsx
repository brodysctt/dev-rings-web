import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import { theme } from "styles";
interface Props {
  isIcon?: boolean;
  size?: number;
  values: [number, number]; // TODO: Make optional if isIcon
}

export const ProgressRing = ({ isIcon = false, values, size = 300 }: Props) => {
  const [actual, goal] = values;
  if (actual >= goal) return <CompletedRing size={size} />;
  return (
    <CircularProgress
      variant="determinate"
      size={isIcon ? 26 : size}
      thickness={isIcon ? 6 : 4} // Navbar was 6
      value={isIcon ? 100 : (actual / goal) * 100}
      sx={isIcon ? {} : { mb: 2 }}
    />
  );
};

interface IProps {
  size?: number;
  isDayTile?: boolean;
}

const CompletedRing = ({ size = 400, isDayTile = false }: IProps) => {
  const checkStart = [size * 0.433, size * 0.516];
  const checkVertex = [size * 0.483, size * 0.566];
  const checkEnd = [size * 0.6, size * 0.45];
  return (
    <Stack mt={-0.7}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx={size * 0.5}
          cy={size * 0.5}
          r={size * 0.33}
          stroke={theme.palette.primary.main}
          strokeWidth={isDayTile ? 4 : 20}
          strokeLinecap="round"
          fill="transparent"
          style={{ rotate: 270 }}
          variants={draw}
          custom={1}
        />
        <motion.line
          x1={checkStart[0]}
          y1={checkStart[1]}
          x2={checkVertex[0]}
          y2={checkVertex[1]}
          stroke={CHECKMARK_COLOUR}
          strokeWidth={isDayTile ? 3 : 15}
          strokeLinecap="round"
          custom={3}
          variants={draw}
        />
        <motion.line
          x1={checkVertex[0]}
          y1={checkVertex[1]}
          x2={checkEnd[0]}
          y2={checkEnd[1]}
          stroke={CHECKMARK_COLOUR}
          strokeWidth={isDayTile ? 3 : 15}
          strokeLinecap="round"
          custom={4.2}
          variants={draw}
        />
      </motion.svg>
    </Stack>
  );
};

const CHECKMARK_COLOUR = theme.palette.success.main;

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => {
    const delay = 0.5 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
