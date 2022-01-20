import { useState, ChangeEvent, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRepos } from "components/track-repos/hooks";

export const TrackRepoCheckboxes = () => {
  const [untrackedRepos, trackedRepos] = useRepos();
  const [checked, setChecked] = useState<Array<string | null>>([null]);

  useEffect(() => {
    if (!untrackedRepos) {
      console.log("ayyy, you're tracking all your public repos");
      return;
    }
    const length = untrackedRepos.length;
    const initState = Array(length).fill(null);
    setChecked(initState);
  }, []);

  // TODO: Handle this properly
  if (!untrackedRepos) return null;

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(
      event.target.checked
        ? untrackedRepos
        : Array(untrackedRepos.length).fill(null)
    );

  const handleRepoCheck =
    (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let updatedState = [...checked];
      updatedState[i] = event.target.checked ? untrackedRepos[i] : null;
      setChecked(updatedState);
    };

  return (
    <Stack>
      <FormControlLabel
        label="All public repos"
        control={
          <Checkbox
            checked={checked.every((checked) => Boolean(checked))}
            indeterminate={
              !checked.every((checked) => Boolean(checked)) &&
              checked.some((checked) => Boolean(checked))
            }
            onChange={handleCheckAll}
          />
        }
      />
      <Stack ml={3}>
        {untrackedRepos.map((repo, i) => {
          return (
            <FormControlLabel
              id={`checkbox-${i}`}
              label={repo}
              control={
                <Checkbox
                  checked={Boolean(checked[i])}
                  onChange={handleRepoCheck(i)}
                />
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
