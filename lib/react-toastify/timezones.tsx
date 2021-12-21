import { toast } from "react-toastify";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { dayjs } from "@lib/dayjs";
import { updateTimezone } from "@lib/firebase/firestore";

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

export const newTimezoneToast = (userId: string, currentTimezone: string) =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ mb: 2, whiteSpace: "pre-wrap" }}
      >
        {`New timezone detected – would you like to change your timezone to ${dayjs.tz.guess()}?`}
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateTimezone(userId, dayjs.tz.guess())}
        >{`change`}</Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
        >{`Keep ${currentTimezone}`}</Button>
      </Box>
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
