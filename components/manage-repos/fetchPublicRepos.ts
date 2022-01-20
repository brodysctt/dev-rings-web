import axios from "axios";
import { toast } from "react-toastify";
import { fetchGitHubToken } from "@lib/firebase/firestore";

export const fetchPublicRepos = async (
  userId: string
): Promise<string[] | void> => {
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

const GITHUB_BASE_URL = "https://api.github.com";
