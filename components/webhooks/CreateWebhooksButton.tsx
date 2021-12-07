import { useAuth } from "@lib/firebase";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, createWebhook, createWebhookToast } from "./utils";
import { Button } from "@mui/material";

export const CreateWebhooksButton = () => {
  const { user } = useAuth();

  const {
    // @ts-ignore
    reloadUserInfo: { screenName: userId },
  } = user;

  if (!userId) {
    return null;
  }
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
          width: "430px",
          marginRight: "100px",
        }}
      >
        <Image src="/github.png" width="40px" height="40px" />
        Create webhooks for all public repos 🎣
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
