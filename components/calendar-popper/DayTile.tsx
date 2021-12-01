import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Typography, ButtonBase } from "@mui/material";
import { Ring, DayLog } from "components";

interface DayTileProps {
  log: DayLog;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const DayTile = ({ log, setAnchorEl }: DayTileProps) => {
  const [hover, setHover] = useState(false);

  const [dateString, { actual, goal }] = log;
  const day = new Date(dateString).getDate();
  return (
    <Link href={`/${dateString}`}>
      <ButtonBase
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setAnchorEl(null)}
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
        <Ring progress={actual} goal={goal} size="mini" />
      </ButtonBase>
    </Link>
  );
};
