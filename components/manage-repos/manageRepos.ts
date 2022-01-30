import type { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken, fetchHookId } from "@lib/firebase/firestore";

export type RepoAction = [string, boolean, string | null];

export const manageRepos = async (
  userId: string,
  repoActions: RepoAction[],
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const token = await fetchGitHubToken(userId);
    await timeout(1500);

    for (const repoAction of repoActions) {
      const [repo, , action] = repoAction;
      if (action === "delete") {
        const hookId = await fetchHookId(userId, repo);
        await axios.post(`${DELETE_WEBHOOK_URL}`, {
          user: userId,
          repo,
          hookId,
          token,
        });
      }
      if (action === "add") {
        await axios.post(`${CREATE_WEBHOOK_URL}`, {
          user: userId,
          repo,
          token,
        });
      }
    }

    toast.success(`Successfully updated repos`);
    setIsLoading(false);
  } catch (error) {
    toast.error(`Something went wrong. Try again later`);
    setIsLoading(false);
    return;
  }
};

const CREATE_WEBHOOK_URL = process.env.NEXT_PUBLIC_CREATE_WEBHOOK_URL;
const DELETE_WEBHOOK_URL = process.env.NEXT_PUBLIC_DELETE_WEBHOOK_URL;

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
