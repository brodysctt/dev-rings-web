import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPublicRepos, trackRepo, trackRepoToast } from "./utils";
import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export const TrackRepoCheckboxes = ({ userId }: { userId: string }) => {
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);

  // TODO: You able to explain what's good with this isMounted pattern dawg?
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

  // TODO: Handle case where user has no public repos
  if (!publicRepos) return null;

  return (
    <>
      <FormGroup>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: 700,
          }}
        >
          {publicRepos.map((repo, i) => (
            <FormControlLabel
              id={`${i}`}
              label={repo}
              control={
                <Checkbox
                  onChange={async () => {
                    console.log(`create webhook for ${repo}`);
                    const response = await trackRepo(userId, repo);
                    response === 200
                      ? trackRepoToast.success()
                      : trackRepoToast.warn();
                  }}
                />
              }
            />
          ))}
        </Box>
      </FormGroup>
      <ToastContainer hideProgressBar />
    </>
  );
};
