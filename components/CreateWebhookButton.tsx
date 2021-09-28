import Image from "next/image";
import axios from "axios";

import { db } from "@lib/firebase";
import { doc, getDoc } from "@firebase/firestore";

export const CreateWebhookButton = () => {
  return (
    <button
      onClick={sendCreateWebhookRequest}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Create a repo webhook
    </button>
  );
};

const sendCreateWebhookRequest = async () => {
  try {
    const token = await fetchToken();

    const response = await axios.post(`${CLOUD_FUNCTION_URL}`, {
      owner: "bscott4",
      repo: "playlist-panda",
      token,
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const fetchToken = async () => {
  // TODO: Update to be dynamic
  const docRef = doc(db, "users", "0bl9ZeYe9fd0HeHWrjc1");
  const docSnap = await getDoc(docRef);

  if (!docSnap) {
    console.log("No such document exists bruh");
    return;
  }

  const data = docSnap.data();

  if (!data) {
    console.log("Document exists, but data be undefined bruh");
    return;
  }

  const { token } = data;
  console.log(`here lies the token: ${token}`);
  return token;
};

const CLOUD_FUNCTION_URL =
  "http://localhost:5001/dev-rings/us-central1/createWebhookHandler";
