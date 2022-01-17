import type { FC } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/system";
import { GetStarted, SetGoalInput, TrackRepoCheckboxes } from "components";
import { useAuth } from "@lib/firebase/auth";
import { getRepos, useCollection, setTimezone } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";

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
  const userId = useAuth();
  if (!userId) return null;

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
      header: `Choose a repo you'd like to start tracking`,
      blob: "/blobclipboard.png",
      subheader: (
        <>
          {`(This is done with `}
          <TextLink href={GITHUB_WEBHOOKS_DOCS} text="a repository webhook" />
          {` btw)`}
        </>
      ),
      body: <SetGoalInput onSuccess={onSuccess} />,
    },
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

  if (activeStep === 3)
    return (
      <Stack sx={stepSx}>
        {webhooks && (
          <GetStarted
            repos={getRepos(webhooks, userId)}
            onSuccess={onSuccess}
          />
        )}
      </Stack>
    );

  return <Box>{children}</Box>;
};

interface IProps {
  header: string | JSX.Element;
  blob: string;
  subheader: string | JSX.Element;
}

const stepSx = {
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
} as SxProps;

const OnboardingPanel: FC<IProps> = ({ header, blob, subheader, children }) => (
  <Stack sx={stepSx}>
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

const TextLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} target="_blank" rel="noopener" underline="none">
    {text}
  </Link>
);

const GITHUB_WEBHOOKS_DOCS =
  "https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks";
