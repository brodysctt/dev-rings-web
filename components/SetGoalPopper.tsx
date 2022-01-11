import { Box, Typography, OutlinedInput } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import { setDailyGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";
import { PopIt, GoalSvg } from "components";

interface Props {
  onSuccess?: () => void;
}

export const SetGoalPopper = ({ onSuccess }: Props) => {
  const { register, handleSubmit } = useForm<{ goal: number }>();

  const userData = useUserDoc();
  if (!userData) return null;
  const [userId, { dailyGoal }] = userData;

  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[1-9]*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Goal must be a number 1 or greater 🎯", {
        position: "top-left",
      });
      return;
    }
    const dailyGoal = Number(goal);
    await setDailyGoal(userId, dailyGoal);
    // TODO: Figure out how to close popper on submit
    // ☝️ Listen for update to goal change
    toast.success(`Goal is now ${dailyGoal} 🏔️`, {
      position: "top-center",
    });
    if (onSuccess) onSuccess();
  };

  return (
    <PopIt id="set-goal" icon={<GoalSvg />}>
      <Box sx={containerSx}>
        <OutlinedInput
          {...register("goal")}
          type="text"
          autoFocus={true}
          onFocus={(e) => (e.target.placeholder = "")}
          sx={{ height: 60, width: 60, mt: 1 }}
          inputProps={{ sx: { textAlign: "center" } }}
          onKeyPress={(kp) => {
            if (kp.key === "Enter") {
              handleSubmit(onSubmit)();
              kp.preventDefault();
              // TODO: What does this do ☝️
            }
          }}
        />
        <Typography
          color="primary.main"
          sx={{ mt: 1, fontSize: "12px" }}
        >{`Current goal is ${dailyGoal}`}</Typography>
      </Box>
    </PopIt>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
