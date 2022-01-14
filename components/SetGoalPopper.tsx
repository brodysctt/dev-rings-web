import { useUserDoc } from "@lib/firebase/firestore";
import { Box, Typography } from "@mui/material";
import { GoalSvg, PopIt, SetGoalInput } from "components";

export const SetGoalPopper = () => {
  const userData = useUserDoc();
  if (!userData) return null;
  const [, { dailyGoal }] = userData;
  return (
    <PopIt id="set-goal" icon={<GoalSvg />}>
      <Box>
        <SetGoalInput />
        {dailyGoal && (
          <Typography
            color="primary.main"
            sx={{ mt: 1, fontSize: "12px" }}
          >{`Current goal is ${dailyGoal}`}</Typography>
        )}
      </Box>
    </PopIt>
  );
};

// const containerSx = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// } as SxProps;
