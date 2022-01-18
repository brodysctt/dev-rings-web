import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubSvg from "@mui/icons-material/GitHub";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "./trackRepo";
import { fetchPublicRepos } from "./fetchPublicRepos";

export const TrackEmAllButton = () => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Button
      variant="contained"
      onClick={async () => await createWebhooks(userId)}
      fullWidth
    >
      <GitHubSvg />
      <Typography
        sx={{ fontSize: 12, ml: 1 }}
      >{`Track all public repos`}</Typography>
    </Button>
  );
};

const createWebhooks = async (userId: string) => {
  const repos = await fetchPublicRepos(userId);
  if (!Array.isArray(repos)) {
    toast.error("Yoinks, something went wrong 😟");
    return;
  }
  console.log(`here be the repos from the button: ${repos}}`);
  if (repos.length < 1) {
    toast.warn(
      "You don't have any public repos! Either create one or try adding a private repo instead 👍"
    );
    return;
  }
  console.log(`about to create ${repos.length} webhooks. let's get it 🪝`);
  for (const repo of repos) {
    const response = await trackRepo(userId, repo);
    response === 200
      ? toast.success("Webhook successfully created")
      : toast.error("Yoinks, something went wrong 😟");
  }
};
