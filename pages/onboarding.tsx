import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { ProgressRing } from "components";

const Onboarding = () => (
  <Box sx={containerSx}>
    <ProgressRing percent={100} />
    <Typography variant="h4" sx={{ mt: 3, mb: 5, color: "primary.main" }}>
      {`Time to get set up`}
    </Typography>
  </Box>
);

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "100vh",
} as SxProps;

export default Onboarding;
