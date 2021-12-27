import { Typography, OutlinedInput } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateDailyGoal, useUserDoc } from "@lib/firebase/firestore";
import { toast } from "react-toastify";
import { PopperWrapper } from "components";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export const SetGoalPopper = () => {
  const { register, handleSubmit } = useForm<{ goal: number }>();

  const userData = useUserDoc();
  if (!userData) return null;

  const [userId, { dailyGoal, hasSetGoal }] = userData;

  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[1-9]*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Goal must be a number 1 or greater 🎯", {
        position: "top-left",
      });
      return;
    }
    const dailyGoal = Number(goal);
    await updateDailyGoal(userId, dailyGoal);
    // TODO: Figure out how to close popper on submit
    toast.success(`Goal is now ${dailyGoal} 🏔️`, {
      position: "top-center",
    });
  };
  return (
    <PopperWrapper
      id="set-goal"
      buttonVariant={!hasSetGoal ? "outlined" : "text"}
      icon={<EmojiEventsIcon />}
    >
      <OutlinedInput
        {...register("goal")}
        type="text"
        autoFocus={true}
        onFocus={(e) => (e.target.placeholder = "")}
        sx={{ height: 60, width: 40, mt: 1 }}
        inputProps={{ sx: { textAlign: "center" } }}
        onKeyPress={(kp) => {
          if (kp.key === "Enter") {
            handleSubmit(onSubmit)();
            kp.preventDefault();
          }
        }}
      />
      <Typography
        color="primary.main"
        sx={{ mt: 1, fontSize: "12px" }}
      >{`Current goal is ${dailyGoal}`}</Typography>
    </PopperWrapper>
  );
};
