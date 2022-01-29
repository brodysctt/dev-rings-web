import axios from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken, fetchHookId } from "@lib/firebase/firestore";

const CREATE_WEBHOOK_URL = process.env.NEXT_PUBLIC_CREATE_WEBHOOK_URL;
const DELETE_WEBHOOK_URL = process.env.NEXT_PUBLIC_DELETE_WEBHOOK_URL;

export const trackRepo = async (
  userId: string,
  repo: string
): Promise<number | void> => {
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
    toast.error("Webhook did not get created");
    return;
  }
};

export const deleteRepo = async (
  userId: string,
  repo: string
): Promise<number | void> => {
  try {
    const token = await fetchGitHubToken(userId);
    const hookId = await fetchHookId(userId, repo);
    const { status } = await axios.post(`${DELETE_WEBHOOK_URL}`, {
      user: userId,
      repo,
      hookId,
      token,
    });

    toast.success("Webhook successfully deleted");
    return status;
  } catch (error) {
    toast.error("Webhook did not get deleted");
    return;
  }
};
