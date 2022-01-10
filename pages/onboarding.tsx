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
import { TrackRepoCheckboxes, SetGoalPopper } from "components";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();

  if (!userData) return null;
  const [, { dailyGoal }] = userData;

  const incrementStep = () => setActiveStep(activeStep + 1);

  const steps = [
    {
      label: "Select repos to track",
      isComplete: Boolean(webhooks),
      child: (
        <Box sx={stepSx}>
          <Typography variant="h6">{`Dev Rings tracks your code contributions via webhooks`}</Typography>
          <TrackRepoCheckboxes onSuccess={incrementStep} />
        </Box>
      ),
    },
    {
      label: "Set a daily contributions goal",
      isComplete: Boolean(dailyGoal),
      child: (
        <Box sx={{ ...stepSx, mb: 20 }}>
          <Typography
            align="center"
            sx={{ mb: 2, whiteSpace: "pre-line" }}
          >{`To track progress, you must first set a goal 🎯
          So, how many contributions will you make towards your projects in a given day?
          Click the trophy to set your daily goal. (This can be updated later on as well)
         `}</Typography>
          <SetGoalPopper onSuccess={incrementStep} />
        </Box>
      ),
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

const stepSx = {
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
