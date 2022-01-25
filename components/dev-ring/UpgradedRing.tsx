import Box from "@mui/material/Box";
import { motion } from "framer-motion";

interface Props {
  size?: number;
  values: [number, number];
  // isDayTile?: boolean;
}

export const UpgradedRing = ({ size = 400, values }: Props) => {
  const [actual, goal] = values;

  const stroke = "#556cd6";
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

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercent,
      transition,
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
          stroke={stroke}
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
          stroke={stroke}
          fill="transparent"
          strokeDashoffset={fillPercent}
          strokeDasharray={circumference}
          strokeLinecap="round"
          variants={variants}
          initial="hidden"
          animate="show"
        />
      </svg>
    </Box>
  );
};
