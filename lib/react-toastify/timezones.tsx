import Image from "next/image";
import { toast } from "react-toastify";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { dayjs } from "@lib/dayjs";
import { setTimezone } from "@lib/firebase/firestore";

// TODO: Removed this from githubSignIn, need to add to OnboardingStepper
// TODO: Delete this once its implemented in stepper
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
      autoClose: 5000,
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
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography color="primary.main" sx={{ mr: 0.5 }}>
          {`New timezone detected`}
        </Typography>
        <Image src="/blobdetective.png" width={20} height={20} />
      </Box>
      <Button
        variant="contained"
        onClick={() => setTimezone(userId, dayjs.tz.guess())}
      >{`change to ${dayjs.tz.guess()}`}</Button>
    </Box>,
    {
      autoClose: false,
      hideProgressBar: true,
    }
  );

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
