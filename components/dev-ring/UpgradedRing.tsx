import Box from "@mui/material/Box";
import { motion } from "framer-motion";

import Lottie from "react-lottie-player";
import checkmarkLottie from "public/checkmark-lottie.json";

interface Props {
  size?: number;
  values: [number, number];
  // isDayTile?: boolean;
}

export const UpgradedRing = ({ size = 400, values }: Props) => {
  const [actual, goal] = values;

  const outerStroke = "#556cd6";
  const middleStroke = "#111033"; //"#7E55D6";
  const innerStroke = "#4DD0E1"; //"#4DB6AC";

  const outerStroke2 = "#4DD0E1"; // "#556cd6";
  const middleStroke2 = "#556cd6"; //"#7E55D6";
  const innerStroke2 = "#111033"; //"#4DB6AC";

  const strokeWidth = 10;

  const radius = 45;
  const circumference = Math.ceil(2 * Math.PI * radius);

  const percent = (actual / goal) * 100;
  console.log(`here be the percent: ${percent}`);

  const fillPercent = Math.abs(
    Math.ceil((circumference / 100) * (percent - 100))
  );

  console.log(`here be the percent: ${percent}`);
  console.log(`here be the stroke offset: ${100 - percent}`);

  const transition = {
    duration: 3,
    delay: 0.5,
    ease: "easeIn",
  };

  const lottieTransition = {
    duration: 3,
    delay: 2,
    ease: "easeIn",
  };

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercent,
      transition,
    },
    lottie: {
      strokeDashoffset: fillPercent,
      lottieTransition,
    },
  };

  return (
    <Box height={size}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle
          cx="50"
          cy="50"
          r={radius}
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
          r={30}
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
          r={radius}
          strokeWidth={strokeWidth}
          stroke={outerStroke2}
          fill="transparent"
          strokeDashoffset={fillPercent}
          strokeDasharray={circumference}
          strokeLinecap="round"
          variants={variants}
          initial="hidden"
          animate="show"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={30}
          strokeWidth={strokeWidth}
          stroke={middleStroke2}
          fill="transparent"
          strokeDashoffset={fillPercent}
          strokeDasharray={circumference}
          strokeLinecap="round"
          variants={variants}
          initial="hidden"
          animate="show"
        />
      </svg>
      {/* TODO: Delay the framer animation, conditionally render for isRingComplete */}
      <motion.div initial="hidden" animate="lottie">
        <Box mt={-50.9}>
          <Lottie
            loop={false}
            animationData={checkmarkLottie}
            play
            speed={0.7}
          />
        </Box>
      </motion.div>
    </Box>
  );
};
