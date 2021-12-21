import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";

export const setGoalToast = () =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {`Woo! Congrats on tracking your first commit 🎉
Now click the 🏆 to update your daily goal`}
      </Typography>
    </Box>,
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      style: {
        width: 390,
      },
    }
  );

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
