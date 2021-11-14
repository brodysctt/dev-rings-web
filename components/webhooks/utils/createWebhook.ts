import axios from "axios";
import { fetchToken } from "helpers";

export const createWebhook = async (userId: string, repo: string) => {
  const token = await fetchToken(userId);

  console.log(`about to create webhook for ${repo}. let's get it 🪝`);
  console.log(`Creating webhook...`);
  const response = await sendCreateWebhookRequest(token, userId, repo);
  response
    ? console.log(`webhook is a go 🟢`)
    : console.log(
        `webhook didn't get created. it's possible a webhook already exists for this repo 👀`
      );
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
