import type { FC } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ManageReposCheckboxes, SetGoalInput } from "components";
import { TextLink } from "components";
import { Button } from "@mui/material";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

export const OnboardingSteps = ({ activeStep, onSuccess }: Props) => {
  const steps = [
    {
      header: "Purpose",
      blob: "/blobhighfive.png",
      body: <Motivation {...{ onSuccess }} />,
    },
    {
      header: `To track progress, you must first set a goal`,
      blob: "/ablobnod.gif",
      subheader: "How many commits will you push in a given day?",
      body: <SetGoalInput onSuccess={onSuccess} />,
    },
    {
      header: `Choose the repos you'd like to start tracking`,
      blob: "/blobclipboard.png",
      subheader: (
        <>
          {`(This is done with `}
          <TextLink href={GITHUB_WEBHOOKS_DOCS} text="repository webhooks" />
          {` btw)`}
        </>
      ),
      body: <ManageReposCheckboxes />,
    },
  ];

  const { header, blob, subheader, body } = steps[activeStep];
  return <Panel {...{ header, blob, subheader }}>{body}</Panel>;
};

interface IProps {
  header: string | JSX.Element;
  blob: string;
  subheader?: string | JSX.Element;
}

const Panel: FC<IProps> = ({ header, blob, subheader, children }) => (
  <Stack justifyContent="center" alignItems="center" height="50vh">
    <Stack direction="row">
      <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
        {header}
      </Typography>
      <Image src={blob} width={30} height={30} />
    </Stack>
    {subheader && (
      <Typography align="center" color="text.secondary" mb={2}>
        {subheader}
      </Typography>
    )}
    {children}
  </Stack>
);

const Motivation = ({ onSuccess }: { onSuccess: () => void }) => (
  <>
    <Typography
      align="center"
      color="text.secondary"
      mt={2}
      mb={2}
      sx={{ whiteSpace: "pre-line" }}
    >{`Here be the reasons why you should use the app:`}</Typography>
    <Typography color="text.secondary" mb={3} sx={{ whiteSpace: "pre-line" }}>
      {`1. Contributions are timestamped according to your local time zone (not UTC).
        2. Commits main in branches outside a repo's default branch are counted
        3. Commits made in forks are counted towards your daily goal`}
    </Typography>
    <Button
      variant="contained"
      onClick={() => onSuccess()}
    >{`True! let's get started`}</Button>
  </>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
