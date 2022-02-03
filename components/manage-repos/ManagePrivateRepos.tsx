import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import { manageRepos, RepoAction } from "components/manage-repos/manageRepos";
import Lottie from "react-lottie-player";
import loadingDotsJson from "public/loading-dots.json";
import GitHubSvg from "@mui/icons-material/GitHub";

export const ManagePrivateRepos = () => {
  return (
    <Stack direction="row">
      <TrackRepoInput />
    </Stack>
  );
};

const TrackRepoInput = () => {
  const { register, handleSubmit } = useForm<{ repoUrl: string }>();
  const [isLoading, setIsLoading] = useState(false);

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

  return isLoading ? (
    <Stack alignItems="center">
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
    <Stack direction="row">
      <GitHubSvg fontSize="large" color="primary" sx={{ mr: 1 }} />
      <Tooltip title="Paste a private repo here to start tracking it">
        <FormControl variant="standard">
          <Input
            {...register("repoUrl")}
            id="repoUrl"
            type="text"
            placeholder={"https://github.com/you/your-awesome-repo.git"}
            onKeyPress={(kp) => {
              if (kp.key === "Enter") {
                handleSubmit(onSubmit)();
                kp.preventDefault();
              }
            }}
            sx={{ width: 350 }}
          />
        </FormControl>
      </Tooltip>
    </Stack>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
