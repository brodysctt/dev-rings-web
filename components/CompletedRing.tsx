import { motion } from "framer-motion";
import { Box } from "@mui/material";

interface Props {
  isMini?: boolean;
}

export const CompletedRing = ({ isMini = false }: Props) => {
  const size = isMini ? 40 : 300;
  const ringStrokeWidth = isMini ? 4 : 20;
  const checkStrokeWidth = isMini ? 3 : 15;
  const checkStart = isMini ? [17.3, 20.6] : [130, 155];
  const checkVertex = isMini ? [19.3, 22.6] : [145, 170];
  const checkEnd = isMini ? [24, 18] : [180, 135];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: -0.7,
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          stroke="#556cd6"
          strokeWidth={ringStrokeWidth}
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
          strokeWidth={checkStrokeWidth}
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
          strokeWidth={checkStrokeWidth}
          strokeLinecap="round"
          custom={4.2}
          variants={draw}
        />
      </motion.svg>
    </Box>
  );
};

const CHECKMARK_COLOUR = "#66CC00";

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
