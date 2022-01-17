import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import useWindowSize from "react-use/lib/useWindowSize";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Confetti from "react-confetti";
import { OnboardingSteps } from "components";
import { useAuth } from "@lib/firebase/auth";
import {
  setIsOnboarding,
  useCollection,
  useUserDoc,
} from "@lib/firebase/firestore";
import type { RepoEvent, Webhook } from "@lib/firebase/firestore";

const Onboarding: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const events = useCollection("events") as RepoEvent[] | null;
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();
  if (!userData) return null;
  const [, { dailyGoal, timezone }] = userData;

  const steps: Array<[string, boolean]> = [
    ["Select repos to track", Boolean(webhooks)],
    ["Set a daily contributions goal", Boolean(dailyGoal)],
    ["Confirm timezone", Boolean(timezone)],
    ["Code", Boolean(events)],
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

  const onboardingComplete = activeStep === steps.length;
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      <StepsToComplete />
      {onboardingComplete ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`Woo! You're ready to start building momentum with Dev Rings 🚀`}
          </Typography>
          <OnboardingConfetti />
        </>
      ) : (
        <>
          <OnboardingSteps activeStep={activeStep} onSuccess={incrementStep} />
          <Stack
            direction="row"
            justifyContent="space-between"
            pt={2}
            width="60%"
          >
            <Button disabled={activeStep === 0} onClick={decrementStep}>
              {`Back`}
            </Button>
            <Button disabled={!steps[activeStep][1]} onClick={incrementStep}>
              {`Next`}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Onboarding;

const OnboardingConfetti = () => {
  const router = useRouter();
  const userId = useAuth();
  const { width, height } = useWindowSize();

  useEffect(
    () => () => {
      if (!userId) return;
      setIsOnboarding(userId);
    },
    [userId]
  );
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }}
    />
  );
};
