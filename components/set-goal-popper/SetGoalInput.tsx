import { OutlinedInput } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateDailyGoal } from "@lib/firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SetGoalInput = ({ userId }: { userId: string }) => {
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
