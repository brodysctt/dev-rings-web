import Box from "@mui/material/Box";
import { motion } from "framer-motion";

import Lottie from "react-lottie-player";
import checkmarkLottie from "public/checkmark-lottie.json";

export type RingValues = [[number, number], [number, number]];

interface Props {
  size?: number;
  values: RingValues;
  // isDayTile?: boolean;
}

export const UpgradedRing = ({ size = 400, values }: Props) => {
  const [[commitsActual, commitsGoal], [prsActual, prsGoal]] = values;

  // const outerStroke = "#556cd6";
  // const middleStroke = "#111033"; //"#7E55D6";
  // const innerStroke = "#4DD0E1"; //"#4DB6AC";

  const outerStroke2 = "#4DD0E1"; // "#556cd6";
  const middleStroke2 = "#556cd6"; //"#7E55D6";
  // const innerStroke2 = "#111033"; //"#4DB6AC";

  const strokeWidth = 10;

  const commitsRadius = 45;
  const commitsCircumference = Math.ceil(2 * Math.PI * commitsRadius);
  const commitsPct = (commitsActual / commitsGoal) * 100;
  console.log(`here be the percent: ${commitsPct}`);
  const commitsFillPct = Math.abs(
    Math.ceil((commitsCircumference / 100) * (commitsPct - 100))
  );

  const prsRadius = 30;
  const prsCircumference = Math.ceil(2 * Math.PI * prsRadius);
  const prsPct = (prsActual / prsGoal) * 100;
  console.log(`here be the percent: ${prsPct}`);
  const prsFillPct = Math.abs(
    Math.ceil((prsCircumference / 100) * (prsPct - 100))
  );

  const transition = {
    duration: 3,
    delay: 0.5,
    ease: "easeIn",
  };

  const variants = {
    hideCommits: {
      strokeDashoffset: commitsCircumference,
      transition,
    },
    showCommits: {
      strokeDashoffset: commitsPct,
      transition,
    },
    hidePRs: {
      strokeDashoffset: prsCircumference,
      transition,
    },
    showPRs: {
      strokeDashoffset: prsPct,
      transition,
    },
  };

  return (
    <Box height={size}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle
          cx="50"
          cy="50"
          r={commitsRadius}
          className="circle"
          strokeWidth={strokeWidth}
          stroke={outerStroke2}
          strokeOpacity={0.25}
          strokeLinecap="round"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={prsRadius}
          className="circle"
          strokeWidth={strokeWidth}
          stroke={middleStroke2}
          strokeOpacity={0.25}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          position: "absolute",
          transform: "rotate(-90deg)",
          overflow: "visible",
          marginLeft: -size, // TODO: Note that this is what makes circles overlap
        }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r={commitsRadius}
          strokeWidth={strokeWidth}
          stroke={outerStroke2}
          fill="transparent"
          strokeDashoffset={commitsFillPct}
          strokeDasharray={commitsCircumference}
          strokeLinecap="round"
          variants={variants}
          initial="hideCommits"
          animate="showCommits"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={prsRadius}
          strokeWidth={strokeWidth}
          stroke={middleStroke2}
          fill="transparent"
          strokeDashoffset={prsFillPct}
          strokeDasharray={prsCircumference}
          strokeLinecap="round"
          variants={variants}
          initial="hidePRs"
          animate="showPRs"
        />
      </svg>
      {/* TODO: Delay the framer animation, conditionally render for isRingComplete */}
      <Box mt={-50.9}>
        <Lottie loop={false} animationData={checkmarkLottie} play speed={0.7} />
      </Box>
    </Box>
  );
};
