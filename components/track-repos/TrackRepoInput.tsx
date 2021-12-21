import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { trackRepo, trackRepoToast } from "./utils";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const TrackRepoInput = ({ userId }: { userId: string }) => {
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);
  const { register, watch, handleSubmit } = useForm<{ repoUrl: string }>();

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
        marginLeft: "50px",
      }}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="repoUrl">
          Paste a GitHub repo URL here to start tracking it ⚡
        </InputLabel>
        <Input
          {...register("repoUrl")}
          id="repoUrl"
          type="text"
          placeholder={"https://github.com/you/your-awesome-repo.git"}
          startAdornment={
            <InputAdornment position="start">
              <GitHubIcon />
            </InputAdornment>
          }
          sx={{ width: "370px" }}
        />
      </FormControl>
    </Box>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
