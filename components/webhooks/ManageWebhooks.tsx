import { db } from "@lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

import { CreateWebhooksButton } from "components";

export const ManageWebhooks = ({ userId }: { userId: string }) => {
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
      return <CreateWebhooksButton userId={userId} />;
    }
    const urls = docs.map((doc) => {
      const { url } = doc.data();
      return url;
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
        here be the webhooks that have been configured 👇
        {urls.map((url) => (
          <p>{url}</p>
        ))}
      </div>
    );
  }

  return null;
};
