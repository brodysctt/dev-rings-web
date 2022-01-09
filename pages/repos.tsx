import type { NextPage } from "next";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { TrackEmAllButton } from "components";
import { useAuth } from "@lib/firebase/auth";
import {
  fetchPublicRepos,
  trackRepo,
  trackRepoToast,
} from "helpers/track-repos";

// TODO: Implement middleware so it's impossible to land on this without being authenticated
const Repos: NextPage = () => {
  const userId = useAuth();
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);

  // TODO: Refactor with custom hook
  // TODO: Also, refactor with snapshot so it updates automagically
  useEffect(() => {
    (async () => {
      if (userId) {
        const publicRepos = await fetchPublicRepos(userId);
        if (Array.isArray(publicRepos)) {
          setPublicRepos(publicRepos);
        }
      }
    })();
  }, [userId]);

  // TODO: Handle case where user has no public repos
  if (!userId || !publicRepos) return null;

  return (
    <Box sx={containerSx}>
      <Typography variant="h5">{`Check a repo below to start tracking it 
      ✔️`}</Typography>
      <FormGroup>
        <Box sx={checkboxesSx}>
          {/* TODO: Handle case where user has a ton of repos*/}
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
      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <Typography>{`Also, feel free to track 'em all 👉`}</Typography>
        <TrackEmAllButton />
      </Box>
    </Box>
  );
};

export default Repos;

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "60vh",
} as SxProps;

const checkboxesSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: 700,
} as SxProps;
