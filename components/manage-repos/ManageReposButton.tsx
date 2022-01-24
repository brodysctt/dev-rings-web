import { useState } from "react";
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

  // TODO: Does handleSubmit need to be async?
  const handleSubmit = async () => {
    if (!actions) return; // make sure this can't happen with disable
    setIsLoading(true);
    // TODO: Create function that recognizes what to do based on the new state

    for (const action of actions) {
      const [repo, todo] = action;
      if (todo === "delete") {
        await deleteRepo(userId, repo);
      }
      await trackRepo(userId, repo);
      return;
    }
    // actions.forEach(async ([repo, action]) => {
    //   if (action === "delete") {
    //     await deleteRepo(userId, repo);
    //   }
    //   await trackRepo(userId, repo);
    // });

    setIsLoading(false);
    return;
  };

  // TODO: Fix loading state
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
    <Button
      variant="contained"
      color={"primary"}
      disabled={!checked}
      onClick={handleSubmit}
    >
      {`Update repos`}
    </Button>
  );
};

type RepoAction = [string, string];
