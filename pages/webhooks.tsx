import type { NextPage } from "next";

import { db } from "@lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const Webhooks: NextPage = () => {
  const webhooksRef = collection(db, "users", "bscott4", "webhooks");
  const [snapshot, loading, error] = useCollectionOnce(webhooksRef);

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
          height: "100vh",
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

export default Webhooks;
