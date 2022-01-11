import type { FC } from "react";
import { useCollection, useUserDoc, setTimezone } from "@lib/firebase";
import type { Webhook } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { KickOffHero, SetGoalPopper, TrackRepoCheckboxes } from "components";
import { getRepos } from "helpers";

interface Props {
  activeStep: number;
  onSuccess: () => void;
}

// TODO: Listen for Firestore update to User doc (and close on update)
export const OnboardingStep: FC<Props> = ({
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
        <Typography variant="h6">{`Dev Rings tracks your code contributions via webhooks`}</Typography>
        <TrackRepoCheckboxes onSuccess={onSuccess} />
      </Box>
    );

  if (activeStep === 1)
    return (
      <Box sx={{ ...stepSx, mb: 20 }}>
        <Typography
          align="center"
          sx={{ mb: 2, whiteSpace: "pre-line" }}
        >{`To track progress, you must first set a goal 🎯
      So, how many contributions will you make towards your projects in a given day?
      Click the trophy to set your daily goal. (This can be updated later on as well)
     `}</Typography>
        <SetGoalPopper onSuccess={onSuccess} />
      </Box>
    );

  if (activeStep === 2)
    return (
      <Box sx={stepSx}>
        <Typography
          align="center"
          color="primary.main"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {timezone
            ? `Your timezone has been set to ${timezone}`
            : `Your current timezone is ${dayjs.tz.guess()} 🌍
Is this the best timezone for tracking daily goals?`}
        </Typography>
        {!timezone && (
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              setTimezone(userId, dayjs.tz.guess());
              onSuccess();
            }}
          >{`Confirm`}</Button>
        )}
      </Box>
    );

  if (activeStep === 3)
    return (
      <Box sx={stepSx}>
        <Typography
          align="center"
          color="primary.main"
          sx={{ mb: 4, whiteSpace: "pre-wrap" }}
        >
          {`You're all set to track your first contribution!`}
        </Typography>
        {webhooks && <KickOffHero repos={getRepos(webhooks, userId)} />}
      </Box>
    );

  return <Box>{children}</Box>;
};

const stepSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mt: 10,
} as SxProps;
