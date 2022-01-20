import type { FC } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SetGoalInput, TextLink, TrackRepoCheckboxes } from "components";
import { dayjs } from "@lib/dayjs";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

export const OnboardingSteps = ({ activeStep, onSuccess }: Props) => {
  const steps = [
    {
      header: `Choose a repo you'd like to start tracking`,
      blob: "/blobclipboard.png",
      subheader: (
        <>
          {`(This is done with `}
          <TextLink href={GITHUB_WEBHOOKS_DOCS} text="a repository webhook" />
          {` btw)`}
        </>
      ),
      body: <TrackRepoCheckboxes onSuccess={onSuccess} />,
    },
    {
      header: `To track progress, you must first set a goal`,
      blob: "/ablobnod.gif",
      subheader: "How many commits will you push in a given day?",
      body: <SetGoalInput onSuccess={onSuccess} />,
    },
    {
      header: (
        <>
          {`According to `}
          <TextLink href={`https://dayjs.gitee.io/en/`} text={`dayjs, `} />
          {`you're located in ${dayjs.tz.guess()}`}
        </>
      ),
      blob: "/ablobdundundun.gif",
      subheader: "Is this the best timezone for tracking your daily goals?",
      body: (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => console.log("submit timezone")}
        >{`Confirm`}</Button>
      ),
    },
    {
      header: "Noice! Let's get started",
      blob: "/blobyes.png",
      // TODO: Create a get started function that handles account creation
      body: (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => console.log("hi")}
        >{`Get started`}</Button>
      ),
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
      <Typography color="text.secondary" mb={2}>
        {subheader}
      </Typography>
    )}
    {children}
  </Stack>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
