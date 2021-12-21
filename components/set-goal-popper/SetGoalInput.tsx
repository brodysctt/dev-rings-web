import { Dispatch, SetStateAction } from "react";
import { OutlinedInput } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateDailyGoal } from "@lib/firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SetGoalInputProps {
  userId: string;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}

export const SetGoalInput = ({ userId, setAnchorEl }: SetGoalInputProps) => {
  const { register, handleSubmit } = useForm<{ goal: number }>();
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
    setAnchorEl(null);
    toast.success(`Goal is now ${dailyGoal} 🏔️`, {
      position: "top-center",
    });
  };
  return (
    <>
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
      <ToastContainer hideProgressBar />
    </>
  );
};
