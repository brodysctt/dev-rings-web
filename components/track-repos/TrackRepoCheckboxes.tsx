import { useState, ChangeEvent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "components/track-repos/trackRepo";
import { useRepos } from "components/track-repos/hooks";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";

export const TrackRepoCheckboxes = () => {
  const [untrackedRepos] = useRepos();
  const [checked, setChecked] = useState<Array<string | null>>([null]);

  useEffect(() => {
    if (!untrackedRepos) return;
    const length = untrackedRepos.length;
    const initState = Array(length).fill(null);
    setChecked(initState);
  }, []);

  // TODO: Handle this properly
  if (!untrackedRepos) return null;

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(
      event.target.checked
        ? untrackedRepos
        : Array(untrackedRepos.length).fill(null)
    );

  const handleRepoCheck =
    (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let updatedState = [...checked];
      updatedState[i] = event.target.checked ? untrackedRepos[i] : null;
      setChecked(updatedState);
    };

  const reposToTrack = checked.filter((repo) => Boolean(repo));
  const noReposSelected = reposToTrack.length < 1;
  return (
    <Stack>
      <FormControlLabel
        label="Select all public repos"
        control={
          <Checkbox
            checked={checked.every((checked) => Boolean(checked))}
            indeterminate={
              !checked.every((checked) => Boolean(checked)) &&
              checked.some((checked) => Boolean(checked))
            }
            onChange={handleCheckAll}
          />
        }
      />
      <Stack ml={3} mb={2}>
        {/* TODO: Handle case where user has a ton of public repos */}
        {untrackedRepos.map((repo, i) => {
          return (
            <FormControlLabel
              key={i}
              label={repo}
              control={
                <Checkbox
                  checked={Boolean(checked[i])}
                  onChange={handleRepoCheck(i)}
                />
              }
            />
          );
        })}
      </Stack>
      <SubmitButton repos={reposToTrack} disabled={noReposSelected} />
    </Stack>
  );
};

interface Props {
  repos: (string | null)[];
  disabled: boolean;
}

export const SubmitButton = ({ repos, disabled }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAuth();
  if (!userId) return null;

  const handleClick = () => {
    if (disabled) return;
    setIsLoading(true);
    repos.forEach(async (repo) => await trackRepo(userId, repo as string));
    setIsLoading(false);
    // TODO: Create toast for bulk adds
    // toast.success(`Successfully tracked ${repos.length} repos`);
  };

  return isLoading ? (
    <Box
      height={83}
      width={200}
      mt={-6}
      sx={{ position: "relative", zIndex: -1 }}
    >
      <Lottie loop animationData={loadingDotsJson} play />
    </Box>
  ) : (
    <Button variant="contained" disabled={disabled} onClick={handleClick}>
      {`Track repos`}
    </Button>
  );
};
