import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { useForm, SubmitHandler } from "react-hook-form";
import { setGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  color?: string;
  goalType: "commits" | "prs";
  fontSize?: number;
}

export const SetGoalInput = ({
  color = "primary.main",
  goalType,
  fontSize = 30,
}: Props) => {
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
