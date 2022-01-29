import { useState, useEffect, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import { usePublicRepos } from "components/manage-repos/usePublicRepos";
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
    setChecked(repos.map(([repo, state]): RepoAction => [repo, state, null]));
  }, [repos]);

  useEffect(() => {
    (async () => {
      if (!userId || !checked || !isLoading) return;

      for (const update of checked) {
        const [repo, , action] = update;
        if (action === "delete") {
          await deleteRepo(userId, repo);
        }
        if (action === "add") {
          await trackRepo(userId, repo);
        }
      }

      await timeout(2000);
      // TODO: add toast here
      setIsLoading(false);
      return;
    })();
  }, [userId, checked, isLoading]);

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

  const isStatusQuo = checked.every(([, , action]) => !Boolean(action));
  const isPureDelete =
    !isStatusQuo && checked.every(([, , action]) => action !== "add");

  const adds = checked.filter(([, , action]) => action === "add").length;
  const deletes = checked.filter(([, , action]) => action === "delete").length;

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
        <Stack>
          <Button
            variant="contained"
            color={isPureDelete ? "error" : "primary"}
            disabled={checked.every(([, , action]) => !Boolean(action))}
            onClick={() => setIsLoading(true)}
          >
            {isPureDelete ? `Remove repos` : `Update repos`}
          </Button>
          <Stack direction="row" mt={1} justifyContent="center">
            {Boolean(adds) && (
              <Typography
                color="success.main"
                sx={{ whiteSpace: "break-spaces" }}
              >{`Add ${adds} repo${adds > 1 ? "s" : ""}${
                Boolean(deletes) ? `, ` : ""
              }`}</Typography>
            )}
            {Boolean(deletes) && (
              <Typography color="error">{`Remove ${deletes} repo${
                deletes > 1 ? "s" : ""
              }`}</Typography>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
