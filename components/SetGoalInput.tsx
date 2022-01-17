import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import { useForm, SubmitHandler } from "react-hook-form";
import { setDailyGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";

interface Props {
  onSuccess?: () => void;
}

export const SetGoalInput = ({ onSuccess }: Props) => {
  const { register, handleSubmit } = useForm<{ goal: number }>();

  const userData = useUserDoc();
  if (!userData) return null;
  const [userId, { dailyGoal, isOnboarding }] = userData;

  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[1-9].*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Goal must be a number 1 or greater 🎯");
      return;
    }
    await setDailyGoal(userId, Number(goal));
    toast.success(`Goal is now ${goal} 🏔️`);
    if (onSuccess) onSuccess();
  };
  return (
    <Tooltip title={`${isOnboarding ? "Set" : "Update"} daily goal`}>
      <Button disableRipple variant="text" sx={{ height: 60 }}>
        <InputBase
          {...register("goal")}
          placeholder={dailyGoal ? dailyGoal : 3}
          sx={{
            width: 32,
            fontSize: 30,
            color: "primary.main",
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
