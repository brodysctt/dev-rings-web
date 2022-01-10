import { Button, Tooltip } from "@mui/material";
import type { SxProps } from "@mui/system";
import { GitHubSvg } from "components";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import {
  fetchPublicRepos,
  trackRepo,
  trackRepoToast,
} from "helpers/track-repos";

export const TrackEmAllButton = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Tooltip title="Track all public repos">
      <Button
        variant="contained"
        onClick={async () => await createWebhooks(userId)}
        sx={buttonSx}
      >
        <GitHubSvg />
      </Button>
    </Tooltip>
  );
};

const buttonSx = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  p: 1,
} as SxProps;

const createWebhooks = async (userId: string) => {
  const repos = await fetchPublicRepos(userId);
  if (!Array.isArray(repos)) {
    trackRepoToast.error();
    return;
  }
  console.log(`here be the repos from the button: ${repos}}`);
  if (repos.length < 1) {
    toast.warn(
      "yo homeboi, you don't have any public repos! Either create one or try adding a private repo instead 👍"
    );
    return;
  }
  console.log(`about to create ${repos.length} webhooks. let's get it 🪝`);
  for (const repo of repos) {
    const response = await trackRepo(userId, repo);
    response === 200 ? trackRepoToast.success() : trackRepoToast.error();
  }
};
