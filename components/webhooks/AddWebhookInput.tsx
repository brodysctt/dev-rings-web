import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createWebhook } from "./utils";

export const AddWebhookInput = ({ userId }: { userId: string }) => {
  const [repoOwner, setRepoOwner] = useState(true);
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);

  const {
    register,
    watch,
    formState: { isSubmitSuccessful },
    handleSubmit,
  } = useForm<{ repo: string }>();

  const onSubmit: SubmitHandler<{ repo: string }> = async ({ repo }) => {
    console.log(`url looking deeece. Creating webhook for ${repo}...`);
    await createWebhook(userId, repo);
  };

  watch(({ repo }) => {
    if (repo) {
      const isGitHubUrl = githubUrl.test(repo);
      const isRepoOwner = repo.includes(userId);
      const isValidUrl = isGitHubUrl && isRepoOwner;

      if (!isGitHubUrl && !isRepoOwner) {
        setUserNeedsHelp(true);
      }

      if (isGitHubUrl && !isRepoOwner) {
        setRepoOwner(false);
        setUserNeedsHelp(false);
      }

      isValidUrl && handleSubmit(onSubmit)();
    }
  });

  if (isSubmitSuccessful) {
    return <p>successfully added the repo bruh ✅</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        width: "500px",
      }}
    >
      <p> 👇 Copy your repo url and paste it here to start tracking it</p>
      <form>
        <input {...register("repo")} />
        {userNeedsHelp && <p>{`just copy & paste the github link bruh 😅`}</p>}
        {!repoOwner && <p>{`you don't own this repo hossy 😅`}</p>}
      </form>
    </div>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
