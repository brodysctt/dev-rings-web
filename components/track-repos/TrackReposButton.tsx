import Image from "next/image";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, createWebhook, createWebhookToast } from "./utils";
import { Button } from "@mui/material";

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
        <Image src="/github.png" width={30} height={30} />
        Track all public repos
      </Button>
      <ToastContainer hideProgressBar />
    </>
  );
};

const createWebhooks = async (userId: string) => {
  const repos = await fetchPublicRepos(userId);
  if (!Array.isArray(repos)) {
    createWebhookToast.error();
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
    const response = await createWebhook(userId, repo);
    response === 200
      ? createWebhookToast.success()
      : createWebhookToast.error();
  }
};
