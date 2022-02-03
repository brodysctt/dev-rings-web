import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken, useCollection } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";

export const usePrivateRepos = (): string[] | null => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [privateRepos, setPrivateRepos] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!userId || !webhooks) return;

      const publicRepos = await fetchPublicRepos(userId);
      const trackedRepos = webhooks.map(([repo]) => repo);

      if (!publicRepos) {
        setPrivateRepos(trackedRepos);
        return;
      }

      const privateRepos = trackedRepos.filter(
        (repo) => !publicRepos.includes(repo)
      );
      setPrivateRepos(privateRepos);
      return;
    })();
  }, [userId, webhooks]);

  return privateRepos;
};

type RepoState = [string, boolean];
export const usePublicRepos = (): RepoState[] | null => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [publicRepos, setPublicRepos] = useState<RepoState[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const repos = await fetchPublicRepos(userId);

      if (!repos) {
        setPublicRepos(null);
        return;
      }

      if (!webhooks) {
        const state = repos.map((repo): RepoState => [repo, false]);
        setPublicRepos(state);
        return;
      }

      const trackedRepos = webhooks.map(([repo]) => repo);

      const state = repos.map(
        (repo): RepoState => [repo, trackedRepos.includes(repo)]
      );
      setPublicRepos(state);
      return;
    })();
  }, [userId, webhooks]);

  return publicRepos;
};

export const fetchPublicRepos = async (
  userId: string
): Promise<string[] | void> => {
  try {
    const token = await fetchGitHubToken(userId);
    if (!token) {
      throw new Error("no token bruh");
    }

    const axiosClient = axios.create({
      baseURL: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const { data } = await axiosClient.get(`/users/${userId}/repos`);
    if (data.length < 1) {
      toast.warning(
        "Looks like you don't have any public repos. Either create one or try adding a private repo instead"
      );
      return;
    }
    return data.map(({ name: repo }: any) => repo) as string[];
  } catch (error) {
    toast.error("Error fetching public repos");
    return;
  }
};

const GITHUB_BASE_URL = "https://api.github.com";
