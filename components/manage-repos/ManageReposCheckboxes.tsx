import { useState, useEffect, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import { usePublicRepos } from "components/manage-repos/hooks";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo, deleteRepo } from "components/manage-repos/manageRepos";

type CheckedEvent = ChangeEvent<HTMLInputElement>;

type RepoAction = [string, boolean, string | null];

export const ManageReposCheckboxes = () => {
  const userId = useAuth();
  const repos = usePublicRepos();
  const [checked, setChecked] = useState<RepoAction[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!repos) return;
    setChecked(repos.map(([repo, state]): RepoAction => [repo, state, null])); // TODO: Check all during onboarding
  }, [repos]);

  useEffect(() => {
    (async () => {
      if (!userId || !isLoading || !checked) return;

      for (const update of checked) {
        const [repo, , action] = update;
        if (!action) return;
        if (action === "delete") {
          await deleteRepo(userId, repo);
          return;
        }
        await trackRepo(userId, repo);
        return;
      }

      await timeout(2000);
      setIsLoading(false);
      return;
    })();
  }, [userId, isLoading]);

  if (!userId || !repos || !checked) return null; // TODO: Render component for no repos case

  const handleCheckAll = (event: CheckedEvent) => {
    const allChecked = repos.map(
      ([repo, tracked]): RepoAction => [repo, true, !tracked ? "add" : null]
    );
    const noneChecked = repos.map(
      ([repo, tracked]): RepoAction => [repo, false, tracked ? "delete" : null]
    );
    event.target.checked ? setChecked(allChecked) : setChecked(noneChecked);
  };

  const handleRepoCheck =
    (repo: string, tracked: boolean, i: number) => (event: CheckedEvent) => {
      const check = event.target.checked;
      const action =
        check && !tracked ? "add" : !check && tracked ? "delete" : null;

      let update = [...checked];
      update[i] = [repo, check, action];
      setChecked(update);
    };

  return (
    <Stack>
      <FormControlLabel
        label={`Select all public repos`}
        control={
          <Checkbox
            checked={checked.every(([, check]) => check)}
            indeterminate={
              !checked.every(([, check]) => check) &&
              checked.some(([, check]) => check)
            }
            onChange={handleCheckAll}
          />
        }
      />
      <Stack ml={3} mb={2}>
        {/* TODO: Handle case where user has a ton of repos */}
        {repos.map(([repo, tracked], i) => {
          return (
            <FormControlLabel
              key={i}
              label={repo}
              control={
                <Checkbox
                  checked={checked[i][1]}
                  onChange={handleRepoCheck(repo, tracked, i)}
                />
              }
            />
          );
        })}
      </Stack>
      {isLoading ? (
        <Box
          height={83}
          width={200}
          mt={-6}
          sx={{ position: "relative", zIndex: -1 }}
        >
          <Lottie loop animationData={loadingDotsJson} play />
        </Box>
      ) : (
        // TODO: Is it possible to make this button dynamic based on the changes?
        // I.e. "Remove X repos" on a red bg, "Add Y repos" on a green bg
        // TODO: Ensure button is disabled if there's no diff
        <Button
          variant="contained"
          color={"primary"}
          disabled={!checked}
          onClick={() => setIsLoading(true)}
        >
          {`Update repos`}
        </Button>
      )}
      ;
    </Stack>
  );
};

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
