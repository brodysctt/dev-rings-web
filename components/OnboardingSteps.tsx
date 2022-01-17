import type { FC } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  GetStarted,
  SetGoalInput,
  TextLink,
  TrackRepoCheckboxes,
} from "components";
import { useAuth } from "@lib/firebase/auth";
import { getRepos, useCollection, setTimezone } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

export const OnboardingSteps = ({ activeStep, onSuccess }: Props) => {
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const userId = useAuth();
  if (!userId) return null;
  if (!webhooks && activeStep > 0) return null;
  const [repoName] = getRepos(webhooks as Webhook[], userId);

  const onboardingSteps = [
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
      subheader: (
        <>
          {`How many commits will you push `}
          <TextLink
            href={`https://github.com/${userId}/${repoName}`}
            text={repoName}
          />
          {` in a given day?`}
        </>
      ),
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
      subheader: (
        <>
          {`(This is done with `}
          <TextLink href={GITHUB_WEBHOOKS_DOCS} text="a repository webhook" />
          {` btw)`}
        </>
      ),
      body: (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            setTimezone(userId, dayjs.tz.guess());
            onSuccess();
          }}
        >{`Confirm`}</Button>
      ),
    },
  ];

  if (activeStep < 3) {
    const { header, blob, subheader, body } = onboardingSteps[activeStep];
    return (
      <OnboardingPanel header={header} blob={blob} subheader={subheader}>
        {body}
      </OnboardingPanel>
    );
  }

  return (
    <Stack justifyContent="center" alignItems="center" height="50vh">
      {webhooks && (
        <GetStarted repos={getRepos(webhooks, userId)} onSuccess={onSuccess} />
      )}
    </Stack>
  );
};

interface IProps {
  header: string | JSX.Element;
  blob: string;
  subheader: string | JSX.Element;
}

const OnboardingPanel: FC<IProps> = ({ header, blob, subheader, children }) => (
  <Stack justifyContent="center" alignItems="center" height="50vh">
    <Stack direction="row">
      <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
        {header}
      </Typography>
      <Image src={blob} width={30} height={30} />
    </Stack>
    <Typography color="text.secondary">{subheader}</Typography>
    {children}
  </Stack>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
