import type { NextPage } from "next";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { Box } from "@mui/material";
import { TodayDevRing } from "components";

const Today: NextPage = () => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      <TodayDevRing userId={userId} />
    </Box>
  );
};

export default Today;
