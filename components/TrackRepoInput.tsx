import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { GitHubSvg } from "components";
import { trackRepo, trackRepoToast } from "helpers/track-repos";

export const TrackRepoInput = () => {
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);
  const { register, watch, handleSubmit } = useForm<{ repoUrl: string }>();

  const userId = useAuth();
  if (!userId) return null;

  const onSubmit: SubmitHandler<{ repoUrl: string }> = async ({ repoUrl }) => {
    console.log(`url looking deeece. Creating webhook for ${repoUrl}...`);
    const repoSubstring = new RegExp(`(?<=${userId}/).*(?=[.]git)`);
    const result = repoSubstring.exec(repoUrl);
    if (!result) {
      trackRepoToast.error();
      return;
    }
    const repo = result[0];
    const status = await trackRepo(userId, repo);
    if (status === 200) {
      trackRepoToast.success();
    } else {
      trackRepoToast.warn();
    }
  };

  watch(({ repoUrl }) => {
    if (repoUrl) {
      const isGitHubUrl = githubUrl.test(repoUrl);
      const isRepoOwner = repoUrl.includes(userId);
      const isValidUrl = isGitHubUrl && isRepoOwner;

      if (!isGitHubUrl && !isRepoOwner) {
        setUserNeedsHelp(true);
      }
      if (isGitHubUrl && !isRepoOwner) {
        toast.warn(`you don't own this repo hossy 😅`);
      }
      isValidUrl && handleSubmit(onSubmit)();
    }
  });

  userNeedsHelp && trackRepoToast.info();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        width: 400,
        ml: 3,
      }}
    >
      <Tooltip title="Paste a private GitHub repo here to start tracking it">
        <FormControl variant="standard">
          <Input
            {...register("repoUrl")}
            id="repoUrl"
            type="text"
            placeholder={"https://github.com/you/your-awesome-repo.git"}
            startAdornment={
              <InputAdornment position="start">
                <GitHubSvg />
              </InputAdornment>
            }
            sx={{ width: "370px" }}
          />
        </FormControl>
      </Tooltip>
    </Box>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
