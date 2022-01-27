import { useState } from "react";
import type { NextPage } from "next";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { OnboardingConfetti, OnboardingSteps } from "components";
import { useCollection, useUserDoc } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();
  if (!userData) return null;
  const [, { dailyGoal }] = userData;

  const steps: Array<[string, boolean | null]> = [
    ["Motivation", null],
    ["Choose an avatar", null],
    ["Set a daily commits goal", Boolean(dailyGoal)],
    ["Select repos to track", false], // TODO: what's up here?
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
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      <StepsToComplete />
      <OnboardingSteps activeStep={activeStep} onSuccess={incrementStep} />
      <Stack direction="row" justifyContent="space-between" pt={2} width="60%">
        <Button disabled={isFirstStep} onClick={decrementStep}>
          {`Back`}
        </Button>
        {!isLastStep && (
          <Button disabled={!isComplete} onClick={incrementStep}>
            {`Next`}
          </Button>
        )}
      </Stack>
      {webhooks && <OnboardingConfetti />}
    </Stack>
  );
};

export default Onboarding;
