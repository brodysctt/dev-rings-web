import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken, useCollection } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";

type Repos = string[] | null;
export const useRepos = (): [Repos, Repos] => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [untrackedRepos, setUntrackedRepos] = useState<Repos>(null);
  const [trackedRepos, setTrackedRepos] = useState<Repos>(null);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const publicRepos = await fetchPublicRepos(userId);

      if (!publicRepos) {
        console.log("gotta handle this properly");
        return;
      }

      if (!webhooks) {
        setUntrackedRepos(publicRepos);
        return;
      }

      const trackedRepos = getRepos(webhooks, userId);
      const untrackedRepos = publicRepos.filter(
        (repo) => !trackedRepos.includes(repo)
      );
      setTrackedRepos(trackedRepos);
      setUntrackedRepos(untrackedRepos);
      return;
    })();
  }, [userId, webhooks]);

  return [untrackedRepos, trackedRepos];
};

const fetchPublicRepos = async (userId: string): Promise<string[] | void> => {
  try {
    const token = await fetchGitHubToken(userId);
    if (!token) {
      // TODO: Improve this w/ Sentry
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
      // TODO: Create custom toast with TrackRepoInput
      toast.warning(
        "Looks like you don't have any public repos. Either create one or try adding a private repo instead"
      );
      return;
    }
    return data.map(({ name: repo }: any) => repo) as string[];
  } catch (error) {
    // TODO: Add Sentry
    toast.error("Error fetching public repos");
    return;
  }
};

const getRepos = (webhooks: Webhook[], userId: string) =>
  // @ts-ignore
  webhooks.map((webhook) => {
    const re = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
    const match = webhook.url.match(re);
    if (match) return match[0];
  }) as string[];

const GITHUB_BASE_URL = "https://api.github.com";
