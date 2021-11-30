import { Box, Typography } from "@mui/material";
import { Ring, DayLog } from "components";

export const DayTile = ({ log }: { log: DayLog }) => {
  const [dateString, { actual, goal }] = log;
  const day = new Date(dateString).getDate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 60,
        width: 60,
        border: "3px solid #DCDEE6",
        borderRadius: 3,
        pt: "2px",
      }}
    >
      <Typography sx={{ fontSize: 10, alignSelf: "flex-end", mr: "4px" }}>
        {day}
      </Typography>
      <Ring progress={actual} goal={goal} size="mini" />
    </Box>
  );
};
