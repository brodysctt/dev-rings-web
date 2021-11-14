import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createWebhook } from "./utils";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";

export const CreateWebhookInput = ({ userId }: { userId: string }) => {
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);
  const { register, watch, handleSubmit } = useForm<{ repoUrl: string }>();

  const onSubmit: SubmitHandler<{ repoUrl: string }> = async ({ repoUrl }) => {
    console.log(`url looking deeece. Creating webhook for ${repoUrl}...`);
    const repoSubstring = new RegExp(`(?<=${userId}/).*(?=[.]git)`);
    const result = repoSubstring.exec(repoUrl);
    if (!result) {
      toast.error("Yoinks, something went wrong 😟");
      return;
    }
    const repo = result[0];
    const status = await createWebhook(userId, repo);
    if (status === 200) {
      toast.success("webhook successfully created 🎉");
    } else {
      toast.error("Webhook didn't get created – Ima guess it already exist 👀");
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

  userNeedsHelp && toast.info(`just copy & paste the github link bruh 😅`);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        width: "700px",
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
              <Image src="/github.png" width="20px" height="20px" />
            </InputAdornment>
          }
          sx={{ width: "370px" }}
        />
      </FormControl>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <ToastContainer hideProgressBar />
    </Box>
  );
};

const githubUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
