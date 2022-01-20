import { useState, ChangeEvent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "components/manage-repos/trackRepo";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";

type CheckedEvent = ChangeEvent<HTMLInputElement>;
type RepoAction = "add" | "delete";

interface Props {
  repos: string[];
  variant?: RepoAction;
}

export const ManageReposCheckboxes = ({ repos, variant = "add" }: Props) => {
  const [checked, setChecked] = useState<Array<string | null>>([null]);

  useEffect(() => {
    const initState = Array(repos.length).fill(null);
    setChecked(initState);
  }, []);

  const handleCheckAll = (event: CheckedEvent) =>
    setChecked(event.target.checked ? repos : Array(repos.length).fill(null));

  const handleRepoCheck = (i: number) => (event: CheckedEvent) => {
    let updatedState = [...checked];
    updatedState[i] = event.target.checked ? repos[i] : null;
    setChecked(updatedState);
  };

  const isDelete = variant === "delete";
  const reposToAction = checked.filter((repo) => Boolean(repo));
  const disabled = reposToAction.length < 1;
  return (
    <Stack>
      <FormControlLabel
        label={`Select all ${
          isDelete ? "tracked, public" : "untracked, public"
        } repos`}
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
        {/* TODO: Handle case where user has a ton of repos */}
        {repos.map((repo, i) => {
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
      <SubmitButton {...{ disabled, reposToAction, variant }} />
    </Stack>
  );
};

interface IProps {
  disabled: boolean;
  reposToAction: (string | null)[];
  variant: RepoAction;
}

const SubmitButton = ({ disabled, reposToAction, variant }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAuth();
  if (!userId) return null;

  const isDelete = variant === "delete";

  const handleSubmit = () => {
    setIsLoading(true);
    if (isDelete) {
      // TODO: Create delete function
      setIsLoading(false);
      return;
    }

    reposToAction.forEach(
      async (repo) => await trackRepo(userId, repo as string)
    );
    setIsLoading(false);
    return;
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
    <Button
      variant="contained"
      color={isDelete ? "error" : "primary"}
      disabled={disabled}
      onClick={handleSubmit}
    >
      {`${isDelete ? "Delete" : "Track"} repos`}
    </Button>
  );
};
