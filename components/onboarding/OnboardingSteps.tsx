import type { FC } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  AvatarCarousel,
  ManageReposCheckboxes,
  SetGoalInput,
  ProgressRing,
} from "components";
import { Button } from "@mui/material";

interface Props {
  activeStep: number;
  onSubmit?: () => void;
}

export const OnboardingSteps = ({ activeStep, onSubmit }: Props) => {
  const steps = [
    {
      body: <Motivation {...{ onSubmit }} />,
    },
    {
      header: `Every great developer needs a great avatar`,
      blob: "/blobpopcorn.png",
      body: <AvatarCarousel />,
    },
    {
      header: `To track progress, you must first set some goals`,
      blob: "/ablobnod.gif",
      subheader: "How many contributions will you make in a given day?",
      body: (
        <Stack
          direction="row"
          justifyContent="space-between"
          width={300}
          mt={2}
        >
          <Stack>
            <SetGoalInput goalType="commits" fontSize={50} />
            <Typography color="primary">{`Commits`}</Typography>
          </Stack>
          <Stack>
            <SetGoalInput color="#4DD0E1" goalType="prs" fontSize={50} />
            <Typography color="secondary">{`Pull Requests`}</Typography>
          </Stack>
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
          <Typography variant="h5" color="primary" sx={{ mr: 1 }}>
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
  <Stack direction="row" alignItems="center">
    <Stack alignItems="flex-start" mr={6}>
      <Stack direction="row" mb={1}>
        <Typography variant="h5" color="primary" sx={{ mr: 1 }}>
          {`Close your Dev Rings, become a better developer`}
        </Typography>
        <Image src="/blobhighfive.png" width={30} height={30} />
      </Stack>
      <Typography
        color="text.secondary"
        mb={4}
        sx={{ fontSize: 18, whiteSpace: "pre-line" }}
      >
        {`✔️ Set your own goals for commits and pull requests
    ✔️ Visualize progress every day, in whatever timezone you're coding from
    ✔️ Track all your effort – contributions in non-main branches are counted too`}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          if (onSubmit) onSubmit();
        }}
      >{`True! Let's get started`}</Button>
    </Stack>
    <ProgressRing
      isOnboarding
      size={300}
      values={[
        [1, 1],
        [1, 1],
      ]}
    />
  </Stack>
);
