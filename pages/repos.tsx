import type { NextPage } from "next";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { PopperWrapper, GitHubSvg } from "components";
import { useAuth } from "@lib/firebase/auth";
import { toast } from "react-toastify";
import {
  fetchPublicRepos,
  trackRepo,
  trackRepoToast,
} from "helpers/track-repos";

// TODO: Implement middleware so it's impossible to land on this without being authenticated
const Repos: NextPage = () => {
  const userId = useAuth();
  const [publicRepos, setPublicRepos] = useState<string[] | null>(null);

  // TODO: Refactor with custom hook
  useEffect(() => {
    (async () => {
      if (userId) {
        const publicRepos = await fetchPublicRepos(userId);
        if (Array.isArray(publicRepos)) {
          setPublicRepos(publicRepos);
        }
      }
    })();
  }, [userId]);

  // TODO: Handle case where user has no public repos
  if (!userId || !publicRepos) return null;

  return (
    <Box sx={containerSx}>
      <Button
        variant="contained"
        onClick={async () => await createWebhooks(userId)}
        sx={buttonSx}
      >
        <GitHubSvg />
        Track all public repos
      </Button>
      <PopperWrapper
        id="track-repos"
        buttonVariant="text"
        icon={
          <Typography
            sx={{ fontSize: 12 }}
          >{`You can also select repos individually, if you'd prefer`}</Typography>
        }
      >
        <Box sx={popperSx}>
          <FormGroup>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                width: 700,
              }}
            >
              {publicRepos.map((repo, i) => (
                <FormControlLabel
                  key={i}
                  label={repo}
                  control={
                    <Checkbox
                      onChange={async () => {
                        console.log(`create webhook for ${repo}`);
                        const response = await trackRepo(userId, repo);
                        response === 200
                          ? trackRepoToast.success()
                          : trackRepoToast.warn();
                      }}
                    />
                  }
                />
              ))}
            </Box>
          </FormGroup>
        </Box>
      </PopperWrapper>
    </Box>
  );
};

export default Repos;

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: "60vh",
} as SxProps;

const buttonSx = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "8vh",
  width: 300,
  mb: 2,
} as SxProps;

const popperSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 480,
  borderRadius: 10,
} as SxProps;

const createWebhooks = async (userId: string) => {
  const repos = await fetchPublicRepos(userId);
  if (!Array.isArray(repos)) {
    trackRepoToast.error();
    return;
  }
  console.log(`here be the repos from the button: ${repos}}`);
  if (repos.length < 1) {
    toast.warn(
      "yo homeboi, you don't have any public repos! Either create one or try adding a private repo instead 👍"
    );
    return;
  }
  console.log(`about to create ${repos.length} webhooks. let's get it 🪝`);
  for (const repo of repos) {
    const response = await trackRepo(userId, repo);
    response === 200 ? trackRepoToast.success() : trackRepoToast.error();
  }
};
