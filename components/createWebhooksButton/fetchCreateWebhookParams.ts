import axios from "axios";
import { fetchToken } from "helpers";

const GITHUB_BASE_URL = "https://api.github.com";

export const fetchCreateWebhookParams = async (user: string) => {
  try {
    const token = await fetchToken(user);

    if (!token) {
      throw new Error("no token bruh");
    }

    const axiosClient = axios.create({
      baseURL: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const reposResponse = await axiosClient.get(`/users/${user}/repos`);

    const { data: reposData } = reposResponse;

    if (reposData.length < 1) {
      console.log("just heads up bruh, there's no public repos");
    }

    const repos: string[] = reposData.map((repo: any) => {
      const { name } = repo;
      return name;
    });

    console.log(`here be the repos: ${repos}`);

    return {
      token,
      repos,
    };
  } catch (error) {
    console.error(error);
  }
};
