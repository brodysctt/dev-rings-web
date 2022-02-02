import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { useAuth } from "@lib/firebase/auth";
// import { setGoal } from "@lib/firebase/firestore";
import { CommitSvg, PRSvg } from "components";

type GoalState = number | null;

export const ManageGoals = () => {
  const [commitsGoal, setCommitsGoal] = useState<GoalState>(null);
  const [prsGoal, setPrsGoal] = useState<GoalState>(null);
  console.log(`here be the current commitsGoal state: ${commitsGoal}`);
  console.log(`here be the current prsGoal state: ${prsGoal}`);

  return (
    <Stack justifyContent="space-between" alignItems="center" mt={2}>
      <GoalInput goalType="commits" setGoalState={setCommitsGoal} />
      <GoalInput
        disabled={!commitsGoal}
        goalType="prs"
        setGoalState={setPrsGoal}
      />
      <Button
        disabled={!commitsGoal || !prsGoal}
        variant="contained"
      >{`Save goals`}</Button>
    </Stack>
  );
};

interface GoalInputProps {
  disabled?: boolean;
  goalType: "commits" | "prs";
  setGoalState: Dispatch<SetStateAction<GoalState>>;
  // fontSize?: number;
}

const GoalInput = ({
  disabled = false,
  goalType,
  setGoalState,
}: GoalInputProps) => {
  const userId = useAuth();
  if (!userId) return null;

  const isCommits = goalType === "commits";

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const goal = event.target.value;
    console.log(`here be the event as a string: ${goal}`);
    const isOnlyNumbers = /^[1-9].*$/.test(goal);
    if (!isOnlyNumbers) {
      // TODO: set error state to true, render helper text
      console.error("Goal must be a number 1 or greater 🎯");
      return;
    }
    await setGoalState(Number(goal));
  };

  return (
    <TextField
      disabled={disabled}
      label={isCommits ? "Commits" : "Pull requests"}
      color={isCommits ? "primary" : "secondary"}
      onChange={handleChange}
      placeholder="1"
      focused
      fullWidth
      // error
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        sx: { fontSize: 24, textAlign: "center" },
      }}
      InputProps={{
        startAdornment: !disabled && (
          <InputAdornment position="start">
            {/* TODO: Make this a wrapper in EventsIcons */}
            <Stack
              px={0.8}
              py={2}
              height={25}
              sx={{
                justifyContent: "center",
                bgcolor: isCommits ? "primary.main" : "secondary.main", // "#111033"
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
      sx={{ width: 120, mb: 2 }}
    />
  );
};

// const { register, handleSubmit } = useForm<{ goal: number }>();

// const userData = useUserDoc();
// if (!userData) return null;
// const [userId, { dailyGoals }] = userData;

// const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
//   const isOnlyNumbers = /^[1-9].*$/.test(goal);
//   if (!isOnlyNumbers) {
//     toast.error("Goal must be a number 1 or greater 🎯");
//     return;
//   }
//   await setGoal(userId, Number(goal), goalType);
// };
