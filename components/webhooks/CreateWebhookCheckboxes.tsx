import { useState, useEffect } from "react";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, createWebhook, createWebhookToast } from "./utils";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export const CreateWebhookCheckboxes = () => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);

  const [publicRepos, setPublicRepos] = useState([""]);

  // TODO: How we feeling about this useEffect hook? Anything suss?
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
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        width: "380px",
      }}
    >
      <Typography paragraph variant={"h6"} sx={{ marginBottom: 0 }}>
        ✔️ a repo to start tracking it
      </Typography>
      <FormGroup>
        {publicRepos.map((repo) => (
          <FormControlLabel
            label={repo}
            control={
              <Checkbox
                onChange={async () => {
                  console.log(`create webhook for ${repo}`);
                  const response = await createWebhook(userId, repo);
                  response === 200
                    ? createWebhookToast.success()
                    : createWebhookToast.warn();
                }}
              />
            }
          />
        ))}
      </FormGroup>
      <ToastContainer hideProgressBar />
    </Box>
  );
};
