import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchPublicRepos, createWebhook } from "./utils";

export const AddWebhookCheckboxes = ({ userId }: { userId: string }) => {
  const [publicRepos, setPublicRepos] = useState([""]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const publicRepos = await fetchPublicRepos(userId);
      if (isMounted && Array.isArray(publicRepos)) {
        setPublicRepos(publicRepos);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        width: "500px",
      }}
    >
      <p> 👇 Here be the public repos ur not tracking, check em to start</p>
      <form>
        {publicRepos.map((repo) => (
          <label>
            <input
              type="checkbox"
              onChange={async () => {
                console.log(`create webhook for ${repo}`);
                const response = await createWebhook(userId, repo);
                if (response === 200) {
                  toast.success("ayyy successfully created a webhook boi!");
                  return;
                }
                toast.warn(
                  "Webhook didn't get created – Ima guess ur already tracking it 👀"
                );
              }}
            />
            {repo}
          </label>
        ))}
      </form>
      <ToastContainer hideProgressBar />
    </div>
  );
};
