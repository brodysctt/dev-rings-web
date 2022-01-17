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

export const TrackRepoCheckboxes = ({ onSuccess }: Props) => {
  const userId = useAuth();
  const webhooks = useCollection("webhooks") as Webhook[] | null;
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);
  const [trackedRepos, setTrackedRepos] = useState<Array<string | null>>([]);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const repos = await fetchPublicRepos(userId);
      if (Array.isArray(repos)) setPublicRepos(repos);
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
                  checked={trackedRepos.includes(repo)}
                  // TODO: Update this to handle deletes
                  onChange={async () => {
                    await trackRepo(userId, repo);
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
