import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo, deleteRepo } from "components/manage-repos/manageRepos";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";

interface IProps {
  checked: boolean[] | null;
  current: boolean[] | null;
  publicRepos: string[];
}

export const ManageReposButton = ({
  checked,
  current,
  publicRepos,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    (async () => await handleSubmit())();
    setIsLoading(false);
  }, [isLoading]);

  const userId = useAuth();
  if (!userId) return null;

  // TODO: obvs this is not chill, but just to start
  if (!checked || !current) return null;

  const isRepoAction = (
    action: RepoAction | undefined
  ): action is RepoAction => {
    return !!action;
  };

  const actions: RepoAction[] = checked
    .map((newRepoState: boolean, i: number): RepoAction | undefined => {
      if (newRepoState === current[i]) return;
      if (newRepoState) return [publicRepos[i], "add"];
      return [publicRepos[i], "delete"];
    })
    .filter(isRepoAction);

  const reposToAdd = actions.filter(([, action]) => action === "add");
  const reposToDelete = actions.filter(([, action]) => action === "delete");

  const handleSubmit = () => {
    if (!actions) return;
    reposToAdd.forEach(async ([repo]) => await trackRepo(userId, repo));
    reposToDelete.forEach(async ([repo]) => await deleteRepo(userId, repo));
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
  );
};

type RepoAction = [string, string];
