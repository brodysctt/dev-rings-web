import { useRouter } from "next/router";

import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ReposList, CreateWebhookButton } from "components";

import { fetchRepos } from "helpers";

interface SetUpWebhooksProps {
  repos: string[];
}

const SetUpWebhooks = ({ repos }: SetUpWebhooksProps) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <ReposList repos={repos} />
        <CreateWebhookButton />
      </div>
    );
  }
  router.push("/enter");
  return <></>;
};

export default SetUpWebhooks;

export const getStaticProps = async () => {
  try {
    const repos = await fetchRepos();

    if (!repos) {
      console.error("no repos bruh");
      return {
        notFound: true,
      };
    }
    return {
      props: {
        repos,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
