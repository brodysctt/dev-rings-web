import { useContext } from "react";
import { UserContext } from "@lib/context";
import Link from "next/link";
import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { CreateWebhooksButton, CreateWebhookCheckboxes } from "components";
import { Box, Typography, Button } from "@mui/material";
import { SxProps } from "@mui/system";

export const WebhookOnboarding = () => {
  const { userId } = useContext(UserContext);
  // TODO: Think thru how to better handle this
  if (!userId) {
    return null;
  }

  const webhooksRef = collection(db, "users", userId, "webhooks");
  const [snapshot, loading, error] = useCollection(webhooksRef);

  if (loading) {
    return (
      <Box>
        <Typography>Fetching data...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }
  if (snapshot) {
    const { docs } = snapshot;
    if (!docs.length) {
      return (
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <CreateWebhooksButton />
          <CreateWebhookCheckboxes />
        </Box>
      );
    }
    const repos = docs.map((doc) => {
      const { url } = doc.data();
      const repoSubstring = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
      return url.match(repoSubstring);
    });
    return (
      <Box sx={{ ...baseContainerSx, height: "30vh" }}>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <CreateWebhooksButton />
          <CreateWebhookCheckboxes />
        </Box>
        <Box sx={{ ...baseContainerSx, mt: "90px" }}>
          <Typography variant={"h6"}>
            Your commits and PRs in these repos are now being stored 🏪
          </Typography>
          {repos.map((repo) => (
            <Typography>{repo}</Typography>
          ))}

          <Link href="/dev-rings">
            <Button variant="text">
              Noice! Now take me to see the rings 💍
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }
  return null;
};

const baseContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
} as SxProps;
