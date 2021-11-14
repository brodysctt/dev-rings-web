import Image from "next/image";
import { useState } from "react";

import { createWebhookForEachRepo } from "./utils";

export const CreateWebhooksButton = ({ userId }: { userId: string }) => {
  const [noRepos, setNoRepos] = useState(false);

  if (noRepos) {
    return (
      <div>bruh, you have no public repos! tee one up and try again then</div>
    );
  }

  return (
    <button
      onClick={async () => await createWebhookForEachRepo(userId, setNoRepos)}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
        marginRight: "100px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Create webhooks for all public repos🪝
    </button>
  );
};
