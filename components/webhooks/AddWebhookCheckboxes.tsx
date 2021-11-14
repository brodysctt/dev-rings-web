import { useState, useEffect } from "react";
import { createWebhook, fetchCreateWebhookParams } from "./utils";

export const AddWebhookCheckboxes = ({ userId }: { userId: string }) => {
  // TODO: Is this initial state chill?
  const [repos, setRepos] = useState([""]);

  useEffect(() => {
    (async () => {
      const { token, repos } = await fetchCreateWebhookParams(userId);
      console.log(`refactor – I don't even need this token, lol: ${token}`);
      setRepos(repos);
    })();
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
        {repos.map((repo) => (
          <label>
            <input
              type="checkbox"
              onChange={async () => {
                console.log(`create webhook for ${repo}`);
                await createWebhook(userId, repo);
              }}
            />
            {repo}
          </label>
        ))}
      </form>
    </div>
  );
};
