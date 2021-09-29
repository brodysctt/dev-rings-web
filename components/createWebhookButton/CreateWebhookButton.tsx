import Image from "next/image";
import { useState } from "react";

import axios from "axios";
import { fetchCreateWebhookParams } from "./fetchCreateWebhookParams";

export const CreateWebhooksButton = () => {
  const [noRepos, setNoRepos] = useState(false);

  if (noRepos) {
    return (
      <div>bruh, you have no public repos! tee one up and try again then</div>
    );
  }

  return (
    <button
      onClick={() => createWebhookForEachRepo(setNoRepos)}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Create webhooks for all public repos🪝
    </button>
  );
};

const createWebhookForEachRepo = async (
  setNoRepos: (noRepos: boolean) => void
) => {
  const createWebhookParams = await fetchCreateWebhookParams();

  if (!createWebhookParams) {
    throw new Error(`bruh, where's the params at?`);
  }

  const { token, owner, repos } = createWebhookParams;

  if (repos.length < 1) {
    setNoRepos(true);
    return;
  }

  console.log(`about to create ${repos.length} webhooks. let's get it 🪝`);

  repos.forEach(async (repo, i) => {
    console.log(`creating webhook #${i + 1} for ${repo}`);
    const response = await sendCreateWebhookRequest(token, owner, repo);
    response
      ? console.log(`webhook #${i + 1} is a go 🟢`)
      : console.log(
          `webhook #${
            i + 1
          } didn't get created. it's possible a webhook already exists for this repo 👀`
        );
  });
};

const sendCreateWebhookRequest = async (
  token: string,
  owner: string,
  repo: string
) => {
  try {
    const response = await axios.post(`${CLOUD_FUNCTION_URL}`, {
      owner,
      repo,
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const CLOUD_FUNCTION_URL =
  "http://localhost:5001/dev-rings/us-central1/createWebhookHandler";
