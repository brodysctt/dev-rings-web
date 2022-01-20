import Button from "@mui/material/Button";
import { useAuth } from "@lib/firebase/auth";
import { trackRepo } from "./trackRepo";

interface Props {
  repos: string[];
  toLoadingScreen: () => void;
}

export const TrackReposButton = ({ repos, toLoadingScreen }: Props) => {
  const userId = useAuth();
  if (!userId) return null;

  const handleClick = () => {
    toLoadingScreen();
    repos.forEach(async (repo) => await trackRepo(userId, repo));
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      {`Get started`}
    </Button>
  );
};
