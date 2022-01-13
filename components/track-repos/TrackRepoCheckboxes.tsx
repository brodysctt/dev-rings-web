import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { useAuth } from "@lib/firebase/auth";
import { getRepos, useCollection, Webhook } from "@lib/firebase/firestore";
import { toast } from "react-toastify";
import { fetchPublicRepos } from "./fetchPublicRepos";
import { trackRepo } from "./trackRepo";

interface Props {
  onSuccess?: () => void;
}

// TODO: Implement middleware so it's impossible to land on this without being authenticated
export const TrackRepoCheckboxes = ({ onSuccess }: Props) => {
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
      <Typography variant="h6">{`Check a repo below to create a webhook and start tracking it 
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
                    if (response !== 200) {
                      toast.warn(
                        "Webhook did not get created – are you already tracking it? 👀"
                      );
                      return;
                    }
                    toast.success("Webhook successfully created");
                    if (onSuccess) onSuccess();
                    return;
                  }}
                />
              }
            />
          ))}
        </Box>
      </FormGroup>
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
} as SxProps;

const checkboxesSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: 700,
} as SxProps;
