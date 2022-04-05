import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "@lib/firebase/auth";
import { Avatar, Header } from "components";

export const MobileGate = ({ children }: { children: ReactNode }) => {
  const userId = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (userId && isMobile)
    return (
      <Stack justifyContent="center" alignItems="center" height="60vh">
        <Avatar size={320} />
        <Typography
          color="primary"
          variant="h6"
          align="center"
        >{`Dev Rings is optimized for desktop.`}</Typography>
        <Header
          text="Log in there to get started"
          icon="/blobhighfive.png"
          variant="h6"
        />
      </Stack>
    );

  return <>{children}</>;
};
