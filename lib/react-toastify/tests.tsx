import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";

export const testToast = (og: any, dayjs: any) =>
  toast(
    <Box sx={containerSx}>
      <Typography
        align="center"
        color="primary.main"
        sx={{ mb: 2, whiteSpace: "pre-wrap" }}
      >
        {`here be the Date result: ${og}
here be the dayjs result: ${dayjs} `}
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
