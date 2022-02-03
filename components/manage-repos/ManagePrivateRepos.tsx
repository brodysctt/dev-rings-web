import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { usePrivateRepos } from "components/manage-repos/hooks";
import { useAuth } from "@lib/firebase/auth";
import { manageRepos, RepoAction } from "components/manage-repos/manageRepos";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import GitHubSvg from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export const ManagePrivateRepos = () => {
  return (
    <Stack direction="row">
      <TrackRepoInput />
    </Stack>
  );
};

const TrackRepoInput = () => {
  const repos = usePrivateRepos();
  const { register, handleSubmit } = useForm<{ repoUrl: string }>();
  // TODO: Clear input value by returning a cleanup function in a useEffect
  // const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<string | null>(null);

  const userId = useAuth();
  if (!userId) return null;

  const onSubmit: SubmitHandler<{ repoUrl: string }> = async ({ repoUrl }) => {
    // TODO: Add validation for repos that are already being tracked
    const isGitHubUrl = githubUrl.test(repoUrl);
    const isRepoOwner = repoUrl.includes(userId);

    if (!isGitHubUrl) {
      toast.error(`This is not a GitHub repo link`, {
        position: "top-center",
      });
      return;
    }
    if (!isRepoOwner) {
      toast.error(`You don't own this repo`, {
        position: "top-center",
      });
      return;
    }

    const re = new RegExp(`(?<=${userId}/).*(?=[.]git)`);
    const result = re.exec(repoUrl);
    if (!result) {
      // TODO: Improve this
      return;
    }
    const repo = result[0];
    // TODO: Improve TypeScript here
    const repoAction = [repo as string, false, "add"] as RepoAction;
    await manageRepos(userId, [repoAction], setIsLoading);
  };

  return (
    <Stack>
      <Stack justifyContent="center">
        {isLoading ? (
          <Stack alignItems="center" height={60}>
            <Box
              height={83}
              width={200}
              mt={-6}
              sx={{ position: "relative", zIndex: -1 }}
            >
              <Lottie loop animationData={loadingDotsJson} play />
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" mb={3}>
            <GitHubSvg fontSize="large" color="primary" sx={{ mr: 1 }} />
            <Tooltip title="Paste a private repo here to start tracking it">
              <FormControl variant="standard">
                <Input
                  {...register("repoUrl")}
                  id="repoUrl"
                  type="text"
                  placeholder={"https://github.com/you/your-awesome-repo.git"}
                  onKeyPress={(kp) => {
                    if (kp.key !== "Enter") {
                      kp.preventDefault();
                      return;
                    }
                    handleSubmit(onSubmit)();
                  }}
                  sx={{ width: 350 }}
                />
              </FormControl>
            </Tooltip>
            <IconButton
              color="primary"
              size="large"
              sx={{ p: 1 }}
              onClick={handleSubmit(onSubmit)}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        )}
        {repos && (
          <Stack justifyContent="center">
            <Divider sx={{ width: "50vw", maxWidth: "md", mb: 3 }}>
              <Chip
                label="CURRENT PRIVATE REPOS"
                variant="filled"
                color="primary"
                sx={{ mb: -2 }}
              />
            </Divider>
            {repos.map((repo, i) => {
              if (isLoading && repoToDelete === repo)
                return (
                  <Stack alignItems="center" height={60}>
                    <Box
                      height={83}
                      width={200}
                      mt={-6}
                      sx={{ position: "relative", zIndex: -1 }}
                    >
                      <Lottie loop animationData={loadingDotsJson} play />
                    </Box>
                  </Stack>
                );
              return (
                <Chip
                  key={i}
                  label={repo}
                  sx={{ width: 150 }}
                  onDelete={async () => {
                    const repoAction = [repo, true, "delete"] as RepoAction;
                    setRepoToDelete(repo);
                    await manageRepos(userId, [repoAction], setIsLoading);
                  }}
                  deleteIcon={<DeleteIcon />}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
