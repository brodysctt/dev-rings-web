import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { dayjs } from "@lib/dayjs";

export const setTimezoneToast = () =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {`Saved ${dayjs.tz.guess()} as your timezone 🌍
 (If this is wrong, try again without a VPN 🥸)`}
      </Typography>
    </Box>,
    {
      position: "bottom-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      style: {
        width: 450,
      },
    }
  );

export const newTimezoneToast = (timezone: string) =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {`Here's the current local date: ${dayjs().utcOffset()} 
  and here's timezone date: ${dayjs().tz(timezone).utcOffset()}`}
      </Typography>
    </Box>,
    {
      position: "bottom-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      style: {
        width: 450,
      },
    }
  );

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
