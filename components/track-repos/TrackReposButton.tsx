import { useAuth, getUserId } from "@lib/firebase/auth";
import { toast } from "react-toastify";
import { fetchPublicRepos, trackRepo, trackRepoToast } from "./utils";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const TrackReposButton = () => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);
  return (
    <>
      <Button
        variant="contained"
        onClick={async () => await createWebhooks(userId)}
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "8vh",
          width: 300,
        }}
      >
        <GitHubIcon />
        Track all public repos
      </Button>
    </>
  );
};

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
