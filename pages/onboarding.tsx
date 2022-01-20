import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import { OnboardingSteps, SubmitButton } from "components";
import { useCollection, useUserDoc } from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();
  if (!userData) return null;
  const [, { dailyGoal, timezone }] = userData;

  const steps: Array<[string, boolean]> = [
    ["Set a daily commits goal", Boolean(dailyGoal)],
    ["Confirm timezone", Boolean(timezone)],
    // TODO: make this button true if repos are checked
    ["Select repos to track", Boolean(webhooks)],
  ];

  const StepsToComplete = () => (
    <Stepper activeStep={activeStep} sx={{ width: "60%" }}>
      {steps.map(([label]) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
  const incrementStep = () => setActiveStep(activeStep + 1);
  const decrementStep = () => setActiveStep(activeStep - 1);

  // TODO: Does this still make sense?

  const [, isComplete] = steps[activeStep];
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const onboardingComplete = activeStep === steps.length;
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      {onboardingComplete ? (
        <LoadingScreen />
      ) : (
        <>
          <StepsToComplete />
          <OnboardingSteps activeStep={activeStep} onSuccess={incrementStep} />
          <Stack
            direction="row"
            justifyContent="space-between"
            pt={2}
            width="60%"
          >
            <Button disabled={isFirstStep} onClick={decrementStep}>
              {`Back`}
            </Button>
            {isLastStep ? (
              <SubmitButton />
            ) : (
              <Button disabled={!isComplete} onClick={incrementStep}>
                {`Next`}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Onboarding;

const LoadingScreen = () => (
  <Stack justifyContent="center" alignItems="center">
    <Stack direction="row">
      <Typography
        variant="h6"
        color="text.secondary"
        mb={-2}
        mr={1}
        sx={{ position: "relative", zIndex: 99 }}
      >{`Creating webhooks and setting up your account`}</Typography>
      <Image src={"/ablobjam.gif"} width={30} height={30} />
    </Stack>
    <Box height={400} width={400} mb={-4}>
      <Lottie loop animationData={loadingDotsJson} play />
    </Box>
  </Stack>
);
