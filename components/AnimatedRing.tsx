import { motion } from "framer-motion";
import { Box } from "@mui/material";

export const AnimatedRing = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <motion.svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="150"
        cy="150"
        r="100"
        stroke="#556cd6"
        strokeWidth={20}
        strokeLinecap="round"
        fill="transparent"
        style={{ rotate: 270 }}
        variants={draw}
        custom={1}
      />
      <motion.line
        x1="130"
        y1="155"
        x2={VERTEX[0]}
        y2={VERTEX[1]}
        stroke={CHECKMARK_COLOUR}
        strokeWidth={15}
        strokeLinecap="round"
        custom={3}
        variants={draw}
      />
      <motion.line
        x1={VERTEX[0]}
        y1={VERTEX[1]}
        x2="180"
        y2="135"
        stroke={CHECKMARK_COLOUR}
        strokeWidth={15}
        strokeLinecap="round"
        custom={4.2}
        variants={draw}
      />
    </motion.svg>
  </Box>
);

const CHECKMARK_COLOUR = "#66CC00";
const VERTEX = [145, 170];

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
