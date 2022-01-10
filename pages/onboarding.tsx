import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useCollection, useUserDoc, Webhook } from "@lib/firebase/firestore";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { TrackRepoCheckboxes } from "components";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();

  const steps = [
    {
      label: "Select repos to track",
      isComplete: Boolean(webhooks),
      child: (
        <Box sx={step1Sx}>
          <Typography variant="h6">{`Dev Rings tracks your code contributions via webhooks`}</Typography>
          <TrackRepoCheckboxes onCheck={() => setActiveStep(activeStep + 1)} />
          {/* TODO: Would be sassy to show this after 10 seconds 👌 */}
          <Typography
            sx={{ fontSize: 12, mt: 1 }}
          >{`Don't worry, you can always change this later on 👍`}</Typography>
        </Box>
      ),
    },
    {
      label: "Set a daily contributions goal",
      isComplete: userData && userData[1]?.dailygoal,
      child: <Typography>Set a daily contributions goal</Typography>,
    },
    {
      label: "Confirm timezone",
      isComplete: false, // TODO: Make it so timezone is only stored on this action, then use same logic as goal
      child: <Typography>Confirm timezone</Typography>,
    },
  ];

  return (
    <Box sx={containerSx}>
      <Stepper activeStep={activeStep} sx={{ width: "60%" }}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* TODO: Confirm this logic for rendering final component */}
      {activeStep < steps.length ? (
        steps[activeStep].child
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`Woo! You're ready to start building momentum with Dev Rings 🚀`}
            <Link href="/" passHref>
              <Button>Take me to today's ring</Button>
            </Link>
          </Typography>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          pt: 2,
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button
          disabled={!steps[activeStep].isComplete}
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

const step1Sx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mt: 10,
} as SxProps;

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "70vh",
} as SxProps;

export default Onboarding;
