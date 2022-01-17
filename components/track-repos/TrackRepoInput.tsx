import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import GitHubSvg from "@mui/icons-material/GitHub";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "./trackRepo";

export const TrackRepoInput = () => {
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
    // TODO: Make line on theme
    <Stack direction="row" ml={5} mt={1}>
      <GitHubSvg color="primary" fontSize="large" sx={{ mr: 1 }} />
      <Tooltip title="Paste a GitHub URL here to start tracking it">
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
            // TODO: Make responsive
            sx={{ width: 370, fontSize: 16 }}
          />
        </FormControl>
      </Tooltip>
    </Stack>
  );
};
