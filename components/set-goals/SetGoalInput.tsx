import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm, SubmitHandler } from "react-hook-form";
import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";
import { CommitSvg, PRSvg } from "components";

interface Props {
  disabled?: boolean;
  goalType: "commits" | "prs";
  // fontSize?: number;
}

export const SetGoalInput = ({ disabled = false, goalType }: Props) => {
  const isCommits = goalType === "commits";
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
  return (
    <TextField
      disabled={disabled}
      label={isCommits ? "Commits" : "Pull requests"}
      color={isCommits ? "primary" : "secondary"}
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
      sx={{ width: 120, textAlign: "center" }}
    />
  );
};

interface OGProps {
  color?: string;
  goalType: "commits" | "prs";
  fontSize?: number;
}

const SetGoalInput = ({
  color = "primary.main",
  goalType,
  fontSize = 30,
}: OGProps) => {
  const isCommits = goalType === "commits";
  const { register, handleSubmit } = useForm<{ goal: number }>();

  const userData = useUserDoc();
  if (!userData) return null;
  const [userId, { dailyGoals }] = userData;

  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[1-9].*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Goal must be a number 1 or greater 🎯");
      return;
    }
    await setGoal(userId, Number(goal), goalType);
  };
  return (
    <Button disableRipple variant="text" sx={{ height: 60 }}>
      <InputBase
        {...register("goal")}
        sx={{
          width: 32,
          fontSize,
          color,
          input: { textAlign: "center" },
        }}
        onKeyPress={(kp) => {
          if (kp.key === "Enter") {
            handleSubmit(onSubmit)();
            kp.preventDefault();
          }
        }}
        {...(isCommits
          ? { placeholder: dailyGoals.commits ? dailyGoals.commits : 1 }
          : { placeholder: dailyGoals.prs ? dailyGoals.prs : 1 })}
      />
    </Button>
  );
};
