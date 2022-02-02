import type { FC } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  AvatarCarousel,
  Header,
  ManageReposCheckboxes,
  ManageGoals,
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
      body: (
        <Stack alignItems="flex-start" mr={6}>
          <Header
            icon="/blobhighfive.png"
            text="Close your Dev Rings, become a better developer"
            variant="h5"
          />
          <Typography
            color="text.secondary"
            mt={2}
            mb={4}
            sx={{ fontSize: 18, whiteSpace: "pre-line" }}
          >
            {`✔️ Set your own goals for commits and pull requests
              ✔️ Visualize progress every day, in whatever timezone you're coding from
              ✔️ Track all your effort – contributions in non-main branches are counted too`}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (onSubmit) onSubmit();
            }}
          >{`True! Let's get started`}</Button>
        </Stack>
      ),
      hero: <ProgressRing size={300} />,
    },
    {
      body: <AvatarCarousel size={300} />,
    },
    {
      body: (
        <>
          <Header
            text={`Push commits and merge PRs to become a better developer`}
            icon={<ProgressRing size={35} />}
          />
          <Typography align="center" color="text.secondary" mb={2}>
            {`How many contributions will you make in a given day?`}
          </Typography>
          <ManageGoals />
        </>
      ),
    },
    {
      body: (
        <>
          <Header
            text={`Choose the repos you'd like to start tracking`}
            icon="/blobclipboard.png"
          />
          <ManageReposCheckboxes />
        </>
      ),
    },
  ];

  const { body, hero } = steps[activeStep];
  return <Panel {...{ activeStep, hero }}>{body}</Panel>;
};

interface IProps {
  activeStep: number;
  hero?: JSX.Element;
}

const Panel: FC<IProps> = ({ activeStep, hero, children }) => {
  const isAvatarSelect = activeStep === 1;
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="65vh"
      width="100%"
    >
      {isAvatarSelect ? (
        <AvatarSelect>{children}</AvatarSelect>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          {children}
        </Stack>
      )}
      {hero && hero}
    </Stack>
  );
};

const AvatarSelect: FC = ({ children }) => (
  <Stack alignItems="center" width="100%">
    <Header
      text={`Every great developer needs a great avatar`}
      icon="/blobhero.png"
    />
    <Grid overflow="scroll" width="100%">
      {children}
    </Grid>
  </Stack>
);
