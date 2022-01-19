import type { FC } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SetGoalInput, TextLink, TrackRepoCheckboxes } from "components";
import { useAuth } from "@lib/firebase/auth";
import { getRepos, useCollection, setTimezone } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import Lottie from "react-lottie-player";
// @ts-ignore
import lottieJson from "https://assets3.lottiefiles.com/packages/lf20_pwohahvd.json";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

export const OnboardingSteps = ({ activeStep, onSuccess }: Props) => {
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userId = useAuth();
  if (!userId) return null;

  const submitTimezone = () => {
    setTimezone(userId, dayjs.tz.guess());
    onSuccess();
  };

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
      subheader: <></>, // requires data from step 1
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
      blob: "/blobclipboard.png",
      subheader: "Is this the best timezone for tracking your daily goals?",
      body: (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={submitTimezone}
        >{`Confirm`}</Button>
      ),
    },
  ];

  if (activeStep === 0 || activeStep === 2) {
    const { header, blob, subheader, body } = steps[activeStep];
    return <Panel {...{ header, blob, subheader }}>{body}</Panel>;
  }

  if (activeStep === 1) {
    if (!webhooks) return null;
    const [repoName] = getRepos(webhooks as Webhook[], userId);
    const { header, blob, body } = steps[1];
    const subheader = (
      <>
        {`How many commits will you push `}
        <TextLink
          href={`https://github.com/${userId}/${repoName}`}
          text={repoName}
        />
        {` in a given day?`}
      </>
    );
    return <Panel {...{ header, blob, subheader }}>{body}</Panel>;
  }

  return (
    <Stack justifyContent="center" alignItems="center" height="50vh">
      {webhooks && (
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 600, height: 600 }}
        />
      )}
    </Stack>
  );
};

interface IProps {
  header: string | JSX.Element;
  blob: string;
  subheader: string | JSX.Element;
}

const Panel: FC<IProps> = ({ header, blob, subheader, children }) => (
  <Stack justifyContent="center" alignItems="center" height="50vh">
    <Stack direction="row">
      <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
        {header}
      </Typography>
      <Image src={blob} width={30} height={30} />
    </Stack>
    <Typography color="text.secondary" mb={2}>
      {subheader}
    </Typography>
    {children}
  </Stack>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
