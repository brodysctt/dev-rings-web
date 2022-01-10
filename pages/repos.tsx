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
import { TrackEmAllButton, TrackRepoInput } from "components";
import { useAuth } from "@lib/firebase/auth";
import { useCollection } from "@lib/firebase/firestore";
import type { Webhook } from "@lib/firebase/firestore";
import { getRepos, fetchPublicRepos, trackRepo, trackRepoToast } from "helpers";

// TODO: Implement middleware so it's impossible to land on this without being authenticated
const Repos: NextPage = () => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);
  const [trackedRepos, setTrackedRepos] = useState<Array<string | null>>([]);

  useEffect(() => {
    (async () => {
      if (userId) {
        const repos = await fetchPublicRepos(userId);
        if (Array.isArray(repos)) {
          setPublicRepos(repos);
        }
        setTrackedRepos(webhooks ? getRepos(webhooks, userId) : []);
      }
    })();
  }, [userId, webhooks]);

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
                  checked={trackedRepos.includes(repo)}
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
        <TrackEmAllButton />
        <TrackRepoInput />
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
