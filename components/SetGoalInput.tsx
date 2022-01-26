import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import { useForm, SubmitHandler } from "react-hook-form";
import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  color?: string;
  onSuccess?: () => void;
  goalType: "commits" | "prs";
}

export const SetGoalInput = ({
  color = "primary.main",
  onSuccess,
  goalType,
}: Props) => {
  const isCommits = goalType === "commits";
  const { register, handleSubmit } = useForm<{ goal: number }>();

  const userData = useUserDoc();
  if (!userData) return null;
  const [userId, { dailyGoals, isOnboarding }] = userData;

  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[1-9].*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Goal must be a number 1 or greater 🎯");
      return;
    }
    await setGoal(userId, Number(goal), goalType);
    if (onSuccess) onSuccess();
  };
  return (
    <Tooltip title={`${isOnboarding ? "Set" : "Update"} daily goal`}>
      <Button disableRipple variant="text" sx={{ height: 60 }}>
        <InputBase
          {...register("goal")}
          placeholder={
            !dailyGoals ? 3 : isCommits ? dailyGoals.commits : dailyGoals.prs
          }
          sx={{
            width: 32,
            fontSize: 30,
            color,
            input: { textAlign: "center" },
          }}
          onKeyPress={(kp) => {
            if (kp.key === "Enter") {
              handleSubmit(onSubmit)();
              kp.preventDefault();
            }
          }}
        />
      </Button>
    </Tooltip>
  );
};
