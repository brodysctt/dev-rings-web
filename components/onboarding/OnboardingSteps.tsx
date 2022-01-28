import type { FC } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  AvatarCarousel,
  ManageReposCheckboxes,
  SetGoalInput,
} from "components";
import { Button } from "@mui/material";

interface Props {
  activeStep: number;
  onSubmit?: () => void;
}

export const OnboardingSteps = ({ activeStep, onSubmit }: Props) => {
  const steps = [
    {
      header: "Here be the reasons why you should be using Dev Rings:",
      blob: "/blobhighfive.png",
      body: <Motivation {...{ onSubmit }} />,
    },
    {
      // header: `It's your journey, may as well be the main character`,
      // blob: "/blobpopcorn.png",
      body: <AvatarCarousel />,
    },
    {
      header: `To track progress, you must first set a goal`,
      blob: "/ablobnod.gif",
      subheader: "How many commits will you push in a given day?",
      body: (
        <Stack direction="row">
          <SetGoalInput color="#4DD0E1" goalType="commits" />
          <SetGoalInput goalType="prs" />
        </Stack>
      ),
    },
    {
      header: `Choose the repos you'd like to start tracking`,
      blob: "/blobclipboard.png",
      body: <ManageReposCheckboxes />,
    },
  ];

  const { header, blob, subheader, body } = steps[activeStep];
  return <Panel {...{ activeStep, header, blob, subheader }}>{body}</Panel>;
};

interface IProps {
  activeStep: number;
  header?: string | JSX.Element;
  blob?: string;
  subheader?: string | JSX.Element;
}

const Panel: FC<IProps> = (props) => {
  const { activeStep, header, blob, subheader, children } = props;
  const isAvatarCarousel = activeStep === 1;
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="65vh"
      width="100%"
    >
      {header && (
        <Stack direction="row">
          <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
            {header}
          </Typography>
          {blob && <Image src={blob} width={30} height={30} />}
        </Stack>
      )}
      {subheader && (
        <Typography align="center" color="text.secondary" mb={2}>
          {subheader}
        </Typography>
      )}
      {isAvatarCarousel ? (
        <Grid overflow="scroll" width="100%">
          {children}
        </Grid>
      ) : (
        children
      )}
    </Stack>
  );
};

const Motivation = ({ onSubmit }: { onSubmit?: () => void }) => (
  <>
    <Typography color="text.secondary" my={3} sx={{ whiteSpace: "pre-line" }}>
      {`1. Contributions are timestamped according to your local time zone (not UTC).
        2. Commits made in branches outside a repo's default branch (i.e. main) are counted
        3. Commits made in forks are counted as well`}
    </Typography>
    <Button
      variant="contained"
      onClick={() => {
        if (onSubmit) onSubmit();
      }}
    >{`True! let's get started`}</Button>
  </>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
