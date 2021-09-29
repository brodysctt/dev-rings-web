import Image from "next/image";
import { useState } from "react";

import { createWebhookForEachRepo } from "./createWebhookForEachRepo";

export const CreateWebhooksButton = ({ email }: { email: string }) => {
  const [noRepos, setNoRepos] = useState(false);

  if (noRepos) {
    return (
      <div>bruh, you have no public repos! tee one up and try again then</div>
    );
  }

  return (
    <button
      onClick={() => createWebhookForEachRepo(email, setNoRepos)}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Create webhooks for all public repos🪝
    </button>
  );
};
