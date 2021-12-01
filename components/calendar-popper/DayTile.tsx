import { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Typography, ButtonBase } from "@mui/material";
import { Ring, MonthYear } from "components";

export type DayLog = [
  number,
  {
    actual: number;
    goal: number;
  }
];

interface DayTileProps {
  log: DayLog;
  monthInView: MonthYear;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const DayTile = ({ log, monthInView, setAnchorEl }: DayTileProps) => {
  const [hover, setHover] = useState(false);

  const [month, year] = monthInView;

  const [day, { actual, goal }] = log;
  const dateString = `/${month}-${day < 10 ? 0 : ""}${day}-${year}`;
  return (
    <Link href={dateString}>
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
