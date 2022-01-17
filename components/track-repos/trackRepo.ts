import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken } from "@lib/firebase/firestore";

const CREATE_WEBHOOK_URL = process.env.NEXT_PUBLIC_CREATE_WEBHOOK_URL;

export const trackRepo = async (
  userId: string,
  repo: string
): Promise<number | ServerError> => {
  try {
    const token = await fetchGitHubToken(userId);
    const { status } = await axios.post(`${CREATE_WEBHOOK_URL}`, {
      user: userId,
      repo,
      token,
    });
    toast.success("Webhook successfully created");
    return status;
  } catch (error) {
    // TODO: Add Sentry
    toast.error("Webhook did not get created");
    if (!axios.isAxiosError(error)) return { status: 69 };
    const serverError = error as AxiosError<ServerError>;
    return serverError!.response!.status;
  }
};

type ServerError = { status: number };
