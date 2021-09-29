import { NextPage } from "next";
import { useRouter } from "next/router";

import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { CreateWebhooksButton } from "components";

const SetUpWebhooks: NextPage = () => {
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
        <CreateWebhooksButton />
      </div>
    );
  }
  router.push("/enter");
  return <></>;
};

export default SetUpWebhooks;
