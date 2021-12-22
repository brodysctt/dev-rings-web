import type { NextPage } from "next";
import { useAuth } from "@lib/firebase/auth";
import { Box } from "@mui/material";
import { Today } from "components";

const Index: NextPage = () => {
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
      <Today />
    </Box>
  );
};

export default Index;
