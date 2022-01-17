import type { FC } from "react";
import Image from "next/image";
import {
  getRepos,
  useCollection,
  useUserDoc,
  setTimezone,
  Webhook,
} from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { Stack, Box, Typography, Button, Link } from "@mui/material";
import type { SxProps } from "@mui/system";
import { GetStarted, SetGoalInput, TrackRepoCheckboxes } from "components";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

export const OnboardingSteps: FC<Props> = ({
  activeStep,
  onSuccess,
  children,
}) => {
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userData = useUserDoc();
  if (!userData) return null;
  const [userId, { timezone }] = userData;

  if (activeStep === 0)
    return (
      <Box sx={stepSx}>
        <Stack direction="row">
          <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
            {`Choose a repo you'd like to start tracking`}
          </Typography>
          <Image src="/blobclipboard.png" width={30} height={30} />
        </Stack>
        <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
          {`(This is done with `}
          <Link
            href="https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks"
            target="_blank"
            rel="noopener"
            underline="none"
          >
            a repository webhook
          </Link>
          {` btw)`}
        </Typography>
        <TrackRepoCheckboxes onSuccess={onSuccess} />
      </Box>
    );

  if (activeStep === 1) {
    if (!webhooks) return null;
    const [repoName] = getRepos(webhooks, userId);
    return (
      <Box sx={stepSx}>
        <Stack direction="row">
          <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
            {`To track progress, you must first set a goal`}
          </Typography>
          <Image src="/ablobnod.gif" width={30} height={30} />
        </Stack>
        <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
          {`How many commits will you push `}
          <Link
            href={`https://github.com/${userId}/${repoName}`}
            target="_blank"
            rel="noopener"
            underline="none"
          >
            {repoName}
          </Link>
          {` in a given day?`}
        </Typography>
        <SetGoalInput onSuccess={onSuccess} />
      </Box>
    );
  }

  if (activeStep === 2)
    return (
      <Box sx={stepSx}>
        <Stack direction="row">
          <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
            {`According to `}
            <Link
              href={`https://dayjs.gitee.io/en/`}
              target="_blank"
              rel="noopener"
              underline="none"
            >
              {`dayjs, `}
            </Link>
            {`you're located in ${dayjs.tz.guess()}`}
          </Typography>
          <Image src="/ablobdundundun.gif" width={30} height={30} />
        </Stack>
        <Typography color="text.secondary">{`Is this the best timezone for tracking your daily goals?`}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            setTimezone(userId, dayjs.tz.guess());
            onSuccess();
          }}
        >{`Confirm`}</Button>
      </Box>
    );

  if (activeStep === 3)
    return (
      <Box sx={stepSx}>
        {webhooks && (
          <GetStarted
            repos={getRepos(webhooks, userId)}
            onSuccess={onSuccess}
          />
        )}
      </Box>
    );

  return <Box>{children}</Box>;
};

const stepSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
} as SxProps;
