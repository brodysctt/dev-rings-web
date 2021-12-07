import Link from "next/link";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { useWebhooksCollection } from "@lib/firebase/firestore";
import { Box, Typography, Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import { CreateWebhooksButton, CreateWebhookCheckboxes } from "components";

export const WebhookOnboarding = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  const userId = getUserId(user);

  const repoNames = useWebhooksCollection(userId);

  if (!repoNames) {
    return (
      <Box style={{ display: "flex", justifyContent: "space-around" }}>
        <CreateWebhooksButton />
        <CreateWebhookCheckboxes />
      </Box>
    );
  }

  return (
    <Box sx={{ ...containerSx, height: "30vh" }}>
      <Box style={{ display: "flex", justifyContent: "space-around" }}>
        <CreateWebhooksButton />
        <CreateWebhookCheckboxes />
      </Box>
      <Box sx={{ ...containerSx, mt: "90px" }}>
        <Typography variant={"h6"}>
          Your commits and PRs in these repos are now being stored 🏪
        </Typography>
        {repoNames.map((repo) => (
          <Typography>{repo}</Typography>
        ))}

        <Link href="/dev-rings">
          <Button variant="text">Noice! Now take me to see the rings 💍</Button>
        </Link>
      </Box>
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
} as SxProps;
