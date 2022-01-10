import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import { OnboardingStepper } from "components";

const Onboarding = () => (
  <Box sx={containerSx}>
    <OnboardingStepper />
  </Box>
);

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "70vh",
} as SxProps;

export default Onboarding;
