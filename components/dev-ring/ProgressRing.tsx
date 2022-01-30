import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import checkmarkLottie from "public/checkmark-lottie.json";

export type RingValues = [[number, number], [number, number]];
interface Props {
  isDayTile?: boolean;
  size?: number;
  values: RingValues;
}

export const ProgressRing = ({
  isDayTile = false,
  size = 400,
  values,
}: Props) => {
  const [showLottie, setShowLottie] = useState(false);

  const duration = 2;
  useEffect(() => {
    setTimeout(() => setShowLottie(true), duration * 1000 * 2);
  });
  const [[commitsActual, commitsGoal], [prsActual, prsGoal]] = values;

  const outerStroke = "#55D6BF"; //"#4DD0E1";
  const middleStroke = "#556cd6";
  const strokeWidth = 10;

  const commitsRadius = 45;
  const commitsCircumference = Math.ceil(2 * Math.PI * commitsRadius);
  const commitsPct = (commitsActual / commitsGoal) * 100;
  const hitCommitsGoal = commitsPct >= 100;
  const commitsFillPct = hitCommitsGoal
    ? 0
    : Math.abs(Math.ceil((commitsCircumference / 100) * (commitsPct - 100)));

  const prsRadius = 30;
  const prsCircumference = Math.ceil(2 * Math.PI * prsRadius);
  const prsPct = (prsActual / prsGoal) * 100;
  const hitPRsGoal = prsPct >= 100;
  const prsFillPct = hitPRsGoal
    ? 0
    : Math.abs(Math.ceil((prsCircumference / 100) * (prsPct - 100)));

  const transition = {
    duration,
    delay: 0.5,
    ease: "easeIn",
  };

  const variants = {
    hideCommits: {
      strokeDashoffset: commitsCircumference,
      transition,
    },
    showCommits: {
      strokeDashoffset: commitsFillPct,
      transition,
    },
    hidePRs: {
      strokeDashoffset: prsCircumference,
      transition,
    },
    showPRs: {
      strokeDashoffset: prsFillPct,
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
          stroke={outerStroke}
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
          stroke={middleStroke}
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
          marginLeft: -size,
        }}
      >
        {Boolean(commitsPct) && (
          <motion.circle
            cx="50"
            cy="50"
            r={commitsRadius}
            strokeWidth={strokeWidth}
            stroke={outerStroke}
            fill="transparent"
            strokeDashoffset={commitsFillPct}
            strokeDasharray={commitsCircumference}
            strokeLinecap="round"
            variants={variants}
            initial="hideCommits"
            animate="showCommits"
          />
        )}
        {Boolean(prsPct) && (
          <motion.circle
            cx="50"
            cy="50"
            r={prsRadius}
            strokeWidth={strokeWidth}
            stroke={middleStroke}
            fill="transparent"
            strokeDashoffset={prsFillPct}
            strokeDasharray={prsCircumference}
            strokeLinecap="round"
            variants={variants}
            initial="hidePRs"
            animate="showPRs"
          />
        )}
      </svg>
      <Box mt={isDayTile ? -5.9 : -50.9}>
        <Lottie
          loop={false}
          animationData={checkmarkLottie}
          play={showLottie && hitCommitsGoal && hitPRsGoal}
          speed={0.7}
        />
      </Box>
    </Box>
  );
};
