import Image from "next/image";
import axios from "axios";

import { fetchToken } from "helpers";

export const CreateWebhookButton = () => {
  return (
    <button
      onClick={() => sendCreateWebhookRequest()}
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

const CLOUD_FUNCTION_URL =
  "http://localhost:5001/dev-rings/us-central1/createWebhookHandler";
