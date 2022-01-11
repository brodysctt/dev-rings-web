import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  useCollection,
  useUserDoc,
  updateOnboardingStatus,
  updateTz,
} from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { KickOffHero, SetGoalPopper, TrackRepoCheckboxes } from "components";
import { getRepos } from "helpers";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();

  if (!userData) return null;
  const [userId, { dailyGoal, timezone }] = userData;

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
      isComplete: Boolean(timezone),
      child: (
        <Box sx={stepSx}>
          <Typography
            align="center"
            color="primary.main"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {timezone
              ? `Your timezone has been set to ${timezone}`
              : `Your current timezone is ${dayjs.tz.guess()} 🌍
Is this the best timezone for tracking daily goals?`}
          </Typography>
          {!timezone && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                updateTz(userId, dayjs.tz.guess());
                incrementStep();
              }}
            >{`Confirm`}</Button>
          )}
        </Box>
      ),
    },
    {
      label: "Code",
      isComplete: false, // TODO: Update this to be events collection
      child: (
        <Box sx={stepSx}>
          <Typography
            align="center"
            color="primary.main"
            sx={{ mb: 4, whiteSpace: "pre-wrap" }}
          >
            {`You're all set to track your first contribution!`}
          </Typography>
          {webhooks && <KickOffHero repos={getRepos(webhooks, userId)} />}
        </Box>
      ),
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
        <Box sx={{ display: "flex", flexDirection: "column", mt: 10 }}>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`Woo! You're ready to start building momentum with Dev Rings 🚀`}
          </Typography>
          {/* TODO: Upgrade this so that after 5 seconds it just navigates to the index route */}
          <Link href="/" passHref>
            <Button onClick={() => updateOnboardingStatus(userId)}>
              Take me to today's ring
            </Button>
          </Link>
        </Box>
      )}
      {activeStep < steps.length && (
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
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            disabled={!steps[activeStep].isComplete}
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
          >
            Next
          </Button>
        </Box>
      )}
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
