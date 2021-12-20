import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { Typography, ButtonBase } from "@mui/material";
import { Ring, Log } from "components";

interface DayTileProps {
  log: Log;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const DayTile = ({ log, setAnchorEl }: DayTileProps) => {
  const { user } = useAuth();
  const [hover, setHover] = useState(false);

  if (!user) return null;
  const userId = getUserId(user);

  const [dateString, { actual, goal }] = log;
  const isDayOff = !actual && !goal;
  const day = new Date(dateString).getDate();
  return (
    <Link
      href={{
        pathname: "/[userId]/[dateString]",
        query: { userId, dateString },
      }}
      passHref
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
