import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import GitHubSvg from "@mui/icons-material/GitHub";
import type { SxProps } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "./trackRepo";

export const TrackRepoInput = ({ sx }: { sx: SxProps }) => {
  const { register, handleSubmit } = useForm<{ repoUrl: string }>();
  const userId = useAuth();
  if (!userId) return null;

  const onSubmit: SubmitHandler<{ repoUrl: string }> = async ({ repoUrl }) => {
    // TODO: Add validation for repos that are already being tracked
    const validUrl = new RegExp(`https://github.com/(.*)/(.*)[.]git`);
    const isGitHubUrl = validUrl.test(repoUrl);
    const isRepoOwner = repoUrl.includes(userId);

    if (!isGitHubUrl) {
      toast.error(`This is not a GitHub repo link`);
      return;
    }
    if (!isRepoOwner) {
      toast.error(`You don't own this repo`);
      return;
    }

    const re = new RegExp(`(?<=${userId}/).*(?=[.]git)`);
    const result = re.exec(repoUrl);
    if (!result) {
      // TODO: Make this more specific
      toast.error("Yoinks, something went wrong 😟");
      return;
    }
    const repo = result[0];
    const status = await trackRepo(userId, repo);
    if (status !== 200) {
      // TODO: Log to Sentry
      toast.error("Yoinks, something went wrong 😟");
      return;
    }
    toast.success("Webhook successfully created");
  };

  return (
    <Stack direction="row" alignItems="center" sx={sx}>
      <GitHubSvg color="primary" fontSize="large" sx={{ mr: 1 }} />
      <Tooltip title="Paste a GitHub URL here to start tracking it">
        <Input
          {...register("repoUrl")}
          id="repoUrl"
          fullWidth
          placeholder={"https://github.com/you/your-awesome-repo.git"}
          onKeyPress={(kp) => {
            if (kp.key === "Enter") {
              handleSubmit(onSubmit)();
              kp.preventDefault();
            }
          }}
        />
      </Tooltip>
    </Stack>
  );
};
