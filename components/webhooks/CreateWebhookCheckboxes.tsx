import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, createWebhook } from "./utils";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export const CreateWebhookCheckboxes = ({ userId }: { userId: string }) => {
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
        ✔️ Click a repo or 5 to start tracking them
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
                  if (response === 200) {
                    toast.success("ayyy successfully created a webhook boi!");
                    return;
                  }
                  toast.warn(
                    "Webhook didn't get created – Ima guess ur already tracking it 👀"
                  );
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
