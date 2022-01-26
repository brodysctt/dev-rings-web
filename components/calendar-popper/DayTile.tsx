import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@lib/firebase/auth";
import type { Log } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { UpgradedRing } from "components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

export const DayTile = ({ log }: { log: Log }) => {
  const [hover, setHover] = useState(false);
  const userId = useAuth();
  if (!userId) return null;

  const [dateString, { commits, prs }] = log;
  const isDayOff = !commits && !prs;
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
        pt={0.2}
        pb={0.5}
      >
        <Typography
          mr={0.5}
          mb={-1}
          sx={{ fontSize: 10, alignSelf: "flex-end" }}
        >
          {dayjs(dateString).date()}
        </Typography>
        <ButtonBase
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={isDayOff}
          sx={{ bgcolor: hover ? "#F5F6FD" : null, mt: 0.2 }}
        >
          <UpgradedRing
            isDayTile
            size={35}
            values={[
              commits ? [commits.actual, commits.goal] : [0, 1],
              prs ? [prs.actual, prs.goal] : [0, 1],
            ]}
            date={dateString}
          />
        </ButtonBase>
      </Stack>
    </Link>
  );
};
