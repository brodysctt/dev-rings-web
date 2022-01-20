import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAuth } from "@lib/firebase/auth";
import { getRepos, useCollection, Webhook } from "@lib/firebase/firestore";
import { fetchPublicRepos } from "./fetchPublicRepos";
import { trackRepo } from "./trackRepo";

interface Props {
  onSuccess?: () => void;
}

type Repos = string[] | null;

export const OgCheckboxes = ({ onSuccess }: Props) => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [publicRepos, setPublicRepos] = useState<Repos>(null);
  const [trackedRepos, setTrackedRepos] = useState<Repos>(null);
  const [selectedRepos, setSelectedRepos] = useState<Repos>(null);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const repos = await fetchPublicRepos(userId);
      if (repos) setPublicRepos(repos);
      if (webhooks) setTrackedRepos(getRepos(webhooks, userId));
    })();
  }, [userId, webhooks]);

  // TODO: Handle case where user has no public repos
  if (!userId || !publicRepos) return null;
  return (
    <Stack>
      <FormGroup>
        <Stack direction="row" flexWrap="wrap" maxWidth="70vw">
          {/* TODO: Handle case where user has a ton of repos*/}
          {publicRepos.map((repo, i) => (
            <FormControlLabel
              key={i}
              label={repo}
              control={
                <Checkbox
                  onChange={async () => {
                    if (onSuccess) onSuccess();
                  }}
                />
              }
            />
          ))}
        </Stack>
      </FormGroup>
    </Stack>
  );
};
