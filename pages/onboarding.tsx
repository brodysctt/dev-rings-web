import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import useWindowSize from "react-use/lib/useWindowSize";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import Confetti from "react-confetti";
import { OnboardingSteps, TrackReposButton } from "components";
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
              // <TrackReposButton />
              <Button disabled={!isComplete} onClick={incrementStep}>
                {`Next`}
              </Button>
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
