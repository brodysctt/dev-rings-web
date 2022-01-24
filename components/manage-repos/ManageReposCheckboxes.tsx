import { useState, useEffect, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ManageReposButton } from "components/manage-repos/ManageReposButton";
import { useRepos } from "components/manage-repos/hooks";

type CheckedEvent = ChangeEvent<HTMLInputElement>;

export const ManageReposCheckboxes = () => {
  const [publicRepos, trackedRepos] = useRepos();
  const [current, setCurrent] = useState<boolean[] | null>(null);
  const [checked, setChecked] = useState<boolean[] | null>(null);

  const checkAll = (checked: boolean) => {
    // TODO: Is this chill?
    if (!publicRepos) return null;
    return Array(publicRepos.length).fill(checked);
  };

  useEffect(() => {
    // TODO: How do I render private repos in this component?
    if (!publicRepos) return;

    if (!trackedRepos) {
      setCurrent(checkAll(false));
      setChecked(checkAll(true));
      return;
    }

    const initState = publicRepos.map((repo) => trackedRepos.includes(repo));
    setChecked(initState);
    setCurrent(initState);
  }, [publicRepos, trackedRepos]);

  const handleCheckAll = (event: CheckedEvent) =>
    event.target.checked
      ? setChecked(checkAll(true))
      : setChecked(checkAll(false));

  const handleRepoCheck = (i: number) => (event: CheckedEvent) => {
    // TODO: Is this early return chill?
    if (!checked) return;
    let update = [...checked];
    update[i] = event.target.checked;
    setChecked(update);
  };

  return (
    <Stack>
      <FormControlLabel
        label={`Select all public repos`}
        control={
          <Checkbox
            checked={
              checked ? checked.every((checked) => Boolean(checked)) : false
            }
            indeterminate={
              checked
                ? !checked.every((checked) => Boolean(checked)) &&
                  checked.some((checked) => Boolean(checked))
                : false
            }
            onChange={handleCheckAll}
          />
        }
      />
      <Stack ml={3} mb={2}>
        {/* TODO: Handle case where user has a ton of repos */}
        {publicRepos &&
          publicRepos.map((repo, i) => {
            return (
              <FormControlLabel
                key={i}
                label={repo}
                control={
                  <Checkbox
                    checked={checked ? Boolean(checked[i]) : false}
                    onChange={handleRepoCheck(i)}
                  />
                }
              />
            );
          })}
      </Stack>
      {publicRepos && (
        <ManageReposButton {...{ checked, current, publicRepos }} />
      )}
    </Stack>
  );
};
