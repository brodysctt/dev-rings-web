import Link from "next/link";

import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import {
  AddWebhookInput,
  CreateWebhooksButton,
  AddWebhookCheckboxes,
} from "components";

export const WebhookOnboarding = ({ userId }: { userId: string }) => {
  const webhooksRef = collection(db, "users", userId, "webhooks");
  const [snapshot, loading, error] = useCollection(webhooksRef);

  if (loading) {
    return (
      <div>
        <p>Fetching data...</p>
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
  if (snapshot) {
    const { docs } = snapshot;
    if (!docs.length) {
      return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <AddWebhookInput userId={userId} />
          <CreateWebhooksButton userId={userId} />
          <AddWebhookCheckboxes userId={userId} />
        </div>
      );
    }
    const repos = docs.map((doc) => {
      const { url } = doc.data();
      const repoSubstring = new RegExp(`(?<=${userId}/).*(?=/hooks)`);
      return url.match(repoSubstring);
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        here are the repos that are now being tracked 👇
        {repos.map((repo) => (
          <p>{repo}</p>
        ))}
        <Link href="/dev-rings"> Noice! Now take me to see the rings</Link>
      </div>
    );
  }

  return null;
};
