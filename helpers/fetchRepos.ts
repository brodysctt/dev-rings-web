import axios from "axios";
import { fetchToken } from "helpers";

const GITHUB_BASE_URL = "https://api.github.com";

export const fetchRepos = async () => {
  try {
    const token = await fetchToken();

    const userResponse = await axios.get(`${GITHUB_BASE_URL}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const {
      data: { login: owner },
    } = userResponse;

    console.log(`here be the owner: ${owner}`);

    const reposResponse = await axios.get(
      `${GITHUB_BASE_URL}/users/${owner}/repos`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data: repos } = reposResponse;

    if (!repos) {
      throw new Error("bruh! there's no repos");
    }

    const repoNames: string[] = repos.map((repo: any) => {
      const { name } = repo;
      return name;
    });

    console.log(`here be the names: ${repoNames}`);
    return repoNames;
  } catch (error) {
    console.error(error);
  }
};
