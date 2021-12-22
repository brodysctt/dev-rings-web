import type { NextPage } from "next";
import { useAuth } from "@lib/firebase/auth";
import { Box } from "@mui/material";
import { TodayDevRing } from "components";

const Today: NextPage = () => {
  const userId = useAuth();
  if (!userId) return null;
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
