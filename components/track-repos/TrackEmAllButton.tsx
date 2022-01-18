import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubSvg from "@mui/icons-material/GitHub";
import { useAuth } from "@lib/firebase/auth";
import { fetchPublicRepos, trackRepo } from "./functions";

// TODO: Disable/hide this button if user has no public repos
export const TrackEmAllButton = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Button variant="contained" onClick={createWebhooks(userId)} fullWidth>
      <GitHubSvg />
      <Typography
        sx={{ fontSize: 12, ml: 1 }}
      >{`Track all public repos`}</Typography>
    </Button>
  );
};

const createWebhooks = (userId: string) => async () => {
  const repos = await fetchPublicRepos(userId);
  if (!repos) return;
  repos.forEach(async (repo) => await trackRepo(userId, repo));
};
