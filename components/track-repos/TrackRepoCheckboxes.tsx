import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { fetchPublicRepos, trackRepo, trackRepoToast } from "./utils";

export const TrackRepoCheckboxes = () => {
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);
  const userId = useAuth();

  // TODO: Refactor with custom hook
  useEffect(() => {
    (async () => {
      if (userId) {
        const publicRepos = await fetchPublicRepos(userId);
        if (Array.isArray(publicRepos)) {
          setPublicRepos(publicRepos);
        }
      }
    })();
  });

  // TODO: Handle case where user has no public repos
  if (!userId || !publicRepos) return null;

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
              key={i}
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
    </>
  );
};
