import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { TrackRepoCheckboxes } from "components";

export const OnboardingStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "70%" }}>
      <Stepper activeStep={activeStep}>
        <Step key="Select repos to track">
          <StepLabel>{"Select repos to track"}</StepLabel>
        </Step>
        <Step key="Set a daily contributions goal">
          <StepLabel>{"Set a daily contributions goal"}</StepLabel>
        </Step>
        <Step key="Confirm timezone">
          <StepLabel>{"Confirm timezone"}</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 2 ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`Woo! You're ready to start building momentum with Dev Rings 🚀`}
            <Link href="/" passHref>
              <Button>Take me to today's ring</Button>
            </Link>
          </Typography>
        </>
      ) : activeStep === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
          }}
        >
          <Typography variant="h6">{`Dev Rings tracks your code contributions via webhooks`}</Typography>
          <TrackRepoCheckboxes onCheck={() => setActiveStep(activeStep + 1)} />
          {/* TODO: Would be sassy to show this after 10 seconds 👌 */}
          <Typography
            sx={{ fontSize: 12, mt: 1 }}
          >{`Don't worry, you can always change this later on 👍`}</Typography>
        </Box>
      ) : (
        <Typography>hi</Typography>
      )}
    </Box>
  );
};

// const steps = [
//   {
//     title: "Select repos to track",
//     child: (

//     ),
//   },
//   {
//     title: "Set a daily contributions goal",
//     child: <Typography>hi</Typography>,
//   },
//   {
//     title: "Confirm timezone",
//     child: <Typography>hi</Typography>,
//   },
// ];
