import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, createWebhook } from "./utils";

export const CreateWebhooksButton = ({ userId }: { userId: string }) => (
  <>
    <button
      onClick={async () => await createWebhooks(userId)}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
        marginRight: "100px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Create webhooks for all public repos🪝
    </button>
    <ToastContainer hideProgressBar />
  </>
);

const createWebhooks = async (userId: string) => {
  const repos = await fetchPublicRepos(userId);
  if (!Array.isArray(repos)) {
    toast.error("hmm, the fetchPublicRepos request failed 🤔");
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
    if (response === 200) {
      toast.success("Webhook successfully created 🎉");
    } else {
      toast.error(
        "Webhook didn't get created – Ima guess ur already tracking it 👀"
      );
    }
  }
};
