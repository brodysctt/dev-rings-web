import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@lib/firebase/auth";
import type { Log } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { AnimatedRing, ProgressRing } from "components";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import type { SxProps } from "@mui/system";

export const DayTile = ({ log }: { log: Log }) => {
  const [hover, setHover] = useState(false);
  const userId = useAuth();
  if (!userId) return null;

  const [dateString, { actual, goal }] = log;
  const isDayOff = !actual && !goal;
  const hitGoal = !isDayOff && actual >= goal;
  const isToday = dateString === dayjs().format("YYYY-MM-DD");

  const dayHref = {
    pathname: "/[userId]/[dateString]",
    query: { userId, dateString },
  };
  return (
    <Link href={isToday ? "/" : dayHref} passHref>
      <ButtonBase
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        disabled={isDayOff}
        sx={{ ...buttonSx, bgcolor: hover ? "#F5F6FD" : null }}
      >
        <Typography sx={{ fontSize: 10, alignSelf: "flex-end", mr: "4px" }}>
          {dayjs(dateString).date()}
        </Typography>
        {hitGoal ? (
          <AnimatedRing size={40} isDayTile />
        ) : (
          <ProgressRing values={isDayOff ? [0, 1] : [actual, goal]} size={30} />
        )}
      </ButtonBase>
    </Link>
  );
};

const buttonSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: 60,
  width: 60,
  border: "3px solid #DCDEE6",
  borderRadius: 3,
  pt: "2px",
} as SxProps;
