import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useAuth } from "@lib/firebase/auth";
import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { CommitSvg, PRSvg } from "components";
import { toast } from "react-toastify";

type GoalState = number | null;
interface Props {
  isOnboarding?: boolean;
}

export const ManageGoals = ({ isOnboarding = false }: Props) => {
  const [commits, setCommits] = useState<GoalState>(null);
  const [prs, setPrs] = useState<GoalState>(null);
  const userId = useAuth();
  if (!userId) return null;

  const handleGoalsSubmit = async () => {
    if (commits) await setGoal(userId, commits, "commits");
    if (prs) await setGoal(userId, prs, "prs");
    toast.success(`Goals successfully saved`);
  };

  return (
    <Stack justifyContent="space-between" alignItems="center" mt={2}>
      <Stack direction="row" justifyContent="space-between" width={250}>
        <GoalInput
          autoFocus={isOnboarding}
          type="commits"
          setGoalState={setCommits}
        />
        <GoalInput type="prs" setGoalState={setPrs} />
      </Stack>
      <Button
        disabled={!commits && !prs}
        variant="contained"
        onClick={handleGoalsSubmit}
        sx={{ width: 250 }}
      >{`Save goals`}</Button>
    </Stack>
  );
};

interface GoalInputProps {
  autoFocus?: boolean;
  setGoalState: Dispatch<SetStateAction<GoalState>>;
  type: "commits" | "prs";
}

const GoalInput = ({
  autoFocus = false,
  type,
  setGoalState,
}: GoalInputProps) => {
  const [error, setError] = useState(false);
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const { dailyGoals } = userData;

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
      sx={{
        width: 120,
        mb: 2,
        "& .MuiFormLabel-root": {
          zIndex: 0,
        },
      }}
    />
  );
};
