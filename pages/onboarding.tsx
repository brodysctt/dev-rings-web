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
// @ts-ignore
import lottieJson from "https://assets3.lottiefiles.com/packages/lf20_pwohahvd.json";
// @ts-ignore
import lottieJson2 from "https://assets7.lottiefiles.com/packages/lf20_ndqyrqfd.json";
// @ts-ignore
import mountainJson from "https://assets8.lottiefiles.com/packages/lf20_ntrhqntu.json";
import loadingDotsJson from "public/loading-dots.json";
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
    ["Set a daily commits goal", Boolean(dailyGoal)],
    ["Confirm timezone", Boolean(timezone)],
    ["Select repos to track", Boolean(webhooks)],
    ["Submit", Boolean(events)],
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

  //   <>
  //          <Typography sx={{ mt: 2, mb: 1 }}>
  //   {`Woo! You're ready to start building momentum with Dev Rings 🚀`}
  //   </Typography>
  //   <OnboardingConfetti />
  // </>

  const onboardingComplete = activeStep === steps.length;
  return (
    <Stack justifyContent="center" alignItems="center" height="90vh">
      {onboardingComplete ? (
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
            <Lottie loop animationData={loadingDotsJson} play speed={0.7} />
          </Box>
          {/* TODO: Lottie below could be sick for a 404 */}
          {/* <Box height={400} width={400}>
            <Lottie loop animationData={mountainJson} play speed={0.7} />
          </Box> */}
        </Stack>
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
