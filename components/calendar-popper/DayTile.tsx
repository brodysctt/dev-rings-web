import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@lib/firebase/auth";
import type { Log } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { AnimatedRing, ProgressRing } from "components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

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
      <Stack
        border="3px solid #DCDEE6"
        borderRadius={3}
        maxHeight={60}
        maxWidth={60}
        pt={0.5}
      >
        <Typography mr={1} sx={{ fontSize: 10, alignSelf: "flex-end" }}>
          {dayjs(dateString).date()}
        </Typography>
        <ButtonBase
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={isDayOff}
          sx={{ bgcolor: hover ? "#F5F6FD" : null }}
        >
          {hitGoal ? (
            <AnimatedRing size={40} isDayTile />
          ) : (
            <ProgressRing
              values={isDayOff ? [0, 1] : [actual, goal]}
              size={30}
            />
          )}
        </ButtonBase>
      </Stack>
    </Link>
  );
};
