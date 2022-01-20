import { useState, ChangeEvent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRepos } from "components/track-repos/hooks";

export const TrackRepoCheckboxes = () => {
  const [untrackedRepos, trackedRepos] = useRepos();
  const [reposLength, setReposLength] = useState(0);
  const [checked, setChecked] = useState<Array<boolean>>([false]);

  useEffect(() => {
    if (!untrackedRepos) {
      console.log("ayyy, you're tracking all your public repos");
      return;
    }
    const reposLength = untrackedRepos.length;
    const initState = Array(reposLength).fill(false);
    setChecked(initState);
    setReposLength(reposLength);
  }, []);

  // TODO: Handle this properly
  if (!untrackedRepos) return null;

  console.dir(checked);

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(Array(reposLength).fill(event.target.checked));

  const handleRepoCheck =
    (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log(`here be the index: ${i}`);
      console.log(`here be the event boolean ${event.target.checked}`);
      let updatedState = [...checked];
      updatedState[i] = event.target.checked;
      setChecked(updatedState);
    };

  return (
    <Stack>
      <FormControlLabel
        label="All public repos"
        control={
          <Checkbox
            checked={checked.every((checked) => checked)}
            indeterminate={checked.some((checked) => checked)}
            onChange={handleCheckAll}
          />
        }
      />
      <Stack ml={3}>
        {untrackedRepos.map((repo, i) => {
          console.log(`here be the checked boolean: ${checked[i]}`);
          return (
            <FormControlLabel
              id={`checkbox-${i}`}
              label={repo}
              control={
                <Checkbox checked={checked[i]} onChange={handleRepoCheck(i)} />
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
