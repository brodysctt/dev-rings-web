import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useAuth } from "@lib/firebase/auth";
import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { CommitSvg, PRSvg } from "components";

type GoalState = number | null;

export const ManageGoals = () => {
  const [commits, setCommits] = useState<GoalState>(null);
  const [prs, setPrs] = useState<GoalState>(null);
  const userId = useAuth();

  if (!userId) return null;

  return (
    <Stack justifyContent="space-between" alignItems="center" mt={2}>
      <Stack direction="row" justifyContent="space-between" width={250}>
        <GoalInput autoFocus type="commits" setGoalState={setCommits} />
        <GoalInput type="prs" setGoalState={setPrs} />
      </Stack>
      <Button
        disabled={!commits || !prs}
        variant="contained"
        onClick={async () => {
          await setGoal(userId, commits as number, "commits");
          await setGoal(userId, prs as number, "prs");
        }}
        sx={{ width: 250 }}
      >{`Save goals`}</Button>
    </Stack>
  );
};

interface GoalInputProps {
  autoFocus?: boolean;
  disabled?: boolean;
  setGoalState: Dispatch<SetStateAction<GoalState>>;
  type: "commits" | "prs";
}

const GoalInput = ({
  autoFocus = false,
  disabled = false,
  type,
  setGoalState,
}: GoalInputProps) => {
  const [error, setError] = useState(false);
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const [, { dailyGoals }] = userData;
  console.dir(dailyGoals);

  const isCommits = type === "commits";

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const goal = event.target.value;
    if (goal === "0") {
      setError(true);
      return;
    }
    setError(false);
    if (!goal) {
      setGoalState(null);
      return;
    }
    await setGoalState(Number(goal));
  };

  return (
    <TextField
      onKeyPress={(kp) => {
        if (!/[0-9].*/.test(kp.key)) kp.preventDefault();
      }}
      disabled={disabled}
      autoFocus={autoFocus}
      label={isCommits ? "Commits" : "Pull requests"}
      color={isCommits ? "primary" : "secondary"}
      onChange={handleChange}
      fullWidth
      error={error}
      helperText={error ? "Goal cannot be 0" : null}
      FormHelperTextProps={{ sx: { width: "100%" } }}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        sx: { fontSize: 24, textAlign: "center" },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {/* TODO: Make this a wrapper in EventsIcons */}
            <Stack
              px={0.8}
              py={2}
              height={25}
              sx={{
                justifyContent: "center",
                bgcolor: isCommits ? "primary.main" : "secondary.main",
                borderRadius: 50,
                px: 0.8,
                py: 2,
              }}
            >
              {isCommits ? <CommitSvg /> : <PRSvg />}
            </Stack>
          </InputAdornment>
        ),
      }}
      placeholder={
        !dailyGoals ? null : isCommits ? dailyGoals.commits : dailyGoals.prs
      }
      sx={{ width: 120, mb: 2 }}
    />
  );
};
