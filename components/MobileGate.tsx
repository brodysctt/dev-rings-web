import type { ReactNode } from "react";
import { useMobileBreakpoint } from "styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "@lib/firebase/auth";
import { Avatar, Header } from "components";

export const MobileGate = ({ children }: { children: ReactNode }) => {
  const userId = useAuth();
  const isMobile = useMobileBreakpoint();

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
