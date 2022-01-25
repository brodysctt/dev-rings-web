import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { motion } from "framer-motion";

export const UpgradedRing = () => {
  const stroke = "#556cd6";
  const emptyStroke = stroke;
  const emptyStrokeOpacity = 0.25;
  const duration = 3;
  const delay = 0.5;
  const size = 100;
  const strokeWidth = 6;

  const radius = 45;
  const circumference = Math.ceil(2 * Math.PI * radius);
  const fillPercents = Math.abs(Math.ceil((circumference / 100) * (69 - 100)));

  const transition = {
    duration: duration,
    delay: delay,
    ease: "easeIn",
  };

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  };

  return (
    <Stack>
      <Box height={size}>
        <svg
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="circle"
            strokeWidth={strokeWidth}
            stroke={emptyStroke}
            strokeOpacity={emptyStrokeOpacity}
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
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill="transparent"
            strokeDashoffset={fillPercents}
            strokeDasharray={circumference}
            variants={variants}
            initial="hidden"
            animate="show"
          />
        </svg>
      </Box>
    </Stack>
  );
};
