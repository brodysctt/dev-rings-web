import axios from "axios";
import { fetchToken } from "helpers";

const GITHUB_BASE_URL = "https://api.github.com";

export const fetchCreateWebhookParams = async () => {
  try {
    const token = await fetchToken();

    if (!token) {
      throw new Error("no token bruh");
    }

    const axiosClient = axios.create({
      baseURL: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const userResponse = await axiosClient.get("/user");

    const {
      data: { login: owner },
    } = userResponse;

    console.log(`here be the owner: ${owner}`);

    const reposResponse = await axiosClient.get(`/users/${owner}/repos`);

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
      owner,
      repos,
    };
  } catch (error) {
    console.error(error);
  }
};
