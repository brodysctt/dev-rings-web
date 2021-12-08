import axios, { AxiosError } from "axios";
import { fetchGitHubToken } from "@lib/firebase/firestore";

export const trackRepo = async (
  userId: string,
  repo: string
): Promise<number | ServerError> => {
  try {
    const token = await fetchGitHubToken(userId);
    console.log(`Creating webhook for ${repo}...`);
    const { status } = await axios.post(`${CLOUD_FUNCTION_URL}`, {
      user: userId,
      repo,
      token,
    });
    console.dir(status);
    console.log(`Webhook is a go 🟢`);
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        const { response: status } = serverError;
        console.log(
          `webhook didn't get created. it's possible a webhook already exists for this repo 👀`
        );
        console.dir(status);
        return status;
      }
    }
    return { status: 69 };
  }
};

const CLOUD_FUNCTION_URL =
  "http://localhost:5001/dev-rings/us-central1/createWebhookHandler";

type ServerError = { status: number };
