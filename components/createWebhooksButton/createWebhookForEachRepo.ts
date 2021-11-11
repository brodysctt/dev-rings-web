import axios from "axios";
import { fetchCreateWebhookParams } from "./fetchCreateWebhookParams";

export const createWebhookForEachRepo = async (
  user: string,
  setNoRepos: (noRepos: boolean) => void
) => {
  const createWebhookParams = await fetchCreateWebhookParams(user);

  if (!createWebhookParams) {
    throw new Error(`bruh, where's the params at?`);
  }

  const { token, repos } = createWebhookParams;

  if (repos.length < 1) {
    setNoRepos(true);
    return;
  }

  console.log(`about to create ${repos.length} webhooks. let's get it 🪝`);

  for (const repo of repos) {
    console.log(`Creating webhook...`);
    const response = await sendCreateWebhookRequest(token, user, repo);
    response
      ? console.log(`webhook is a go 🟢`)
      : console.log(
          `webhook didn't get created. it's possible a webhook already exists for this repo 👀`
        );
  }
};

const CLOUD_FUNCTION_URL =
  "http://localhost:5001/dev-rings/us-central1/createWebhookHandler";

const sendCreateWebhookRequest = async (
  token: string,
  user: string,
  repo: string
) => {
  try {
    const response = await axios.post(`${CLOUD_FUNCTION_URL}`, {
      user,
      repo,
      token,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
