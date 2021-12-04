import { useState, useContext, Dispatch, SetStateAction } from "react";
import { UserContext } from "lib/context";
import Link from "next/link";
import { Typography, ButtonBase } from "@mui/material";
import { Ring, Log } from "components";

interface DayTileProps {
  log: Log;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const DayTile = ({ log, setAnchorEl }: DayTileProps) => {
  const { userId } = useContext(UserContext);
  if (!userId) {
    return null;
  }

  const [hover, setHover] = useState(false);

  // TODO: Ensure any user set goal is > 0
  const [dateString, { actual, goal }] = log;
  const isDayOff = !Boolean(actual) && !Boolean(goal);
  const day = new Date(dateString).getDate();
  return (
    <Link
      href={{
        pathname: "/[userId]/[dateString]",
        query: { userId, dateString },
      }}
    >
      <ButtonBase
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setAnchorEl(null)}
        disabled={isDayOff}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 60,
          width: 60,
          border: "3px solid #DCDEE6",
          borderRadius: 3,
          bgcolor: hover ? "#F5F6FD" : null,
          pt: "2px",
        }}
      >
        <Typography sx={{ fontSize: 10, alignSelf: "flex-end", mr: "4px" }}>
          {day}
        </Typography>
        <Ring
          progress={isDayOff ? 0 : actual}
          goal={isDayOff ? 1 : goal}
          size="mini"
        />
      </ButtonBase>
    </Link>
  );
};
