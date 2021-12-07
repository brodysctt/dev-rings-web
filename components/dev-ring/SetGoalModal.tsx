import { Box, Typography, Modal, OutlinedInput } from "@mui/material";
import type { SxProps } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateDailyGoal } from "@lib/firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SetGoalModal = ({ userId }: { userId: string }) => {
  const { register, handleSubmit } = useForm<{ goal: number }>();
  const onSubmit: SubmitHandler<{ goal: string }> = async ({ goal }) => {
    const isOnlyNumbers = /^[0-9]*$/.test(goal);
    if (!isOnlyNumbers) {
      toast.error("Numbers only dawg 🙅‍♂️");
      return;
    }
    const dailyGoal = Number(goal);
    await updateDailyGoal(userId, dailyGoal);
  };
  return (
    <Box>
      <Modal
        open={true}
        BackdropProps={{
          sx: {
            bgcolor: "rgba(255, 255, 255, .15)",
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <Box sx={containerSx}>
          <Typography variant="h6" color="primary.main">
            How many commits will you strive for today?
          </Typography>
          <OutlinedInput
            {...register("goal")}
            type="text"
            autoFocus={true}
            onFocus={(e) => (e.target.placeholder = "")}
            sx={{ height: 80, width: 60, mt: 3 }}
            inputProps={{ sx: { textAlign: "center" } }}
            onKeyPress={(kp) => {
              if (kp.key === "Enter") {
                handleSubmit(onSubmit)();
                kp.preventDefault();
              }
            }}
          />
        </Box>
      </Modal>
      <ToastContainer hideProgressBar />
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 200,
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
  borderColor: "#DBDBDD",
  boxShadow: 3,
} as SxProps;
