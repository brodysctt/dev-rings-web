import axios, { AxiosError } from "axios";
import { fetchToken } from "helpers";

export const fetchPublicRepos = async (
  userId: string
): Promise<string[] | ServerError> => {
  try {
    const token = await fetchToken(userId);
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
      console.log("just a heads up bruh, there's no public repos");
    }

    // TODO: Add a Repo type here
    const repos: string[] = data.map((repo: any) => {
      const { name } = repo;
      return name;
    });

    console.log(`here be the repos: ${repos}`);
    return repos;
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

const GITHUB_BASE_URL = "https://api.github.com";

type ServerError = { status: number };
