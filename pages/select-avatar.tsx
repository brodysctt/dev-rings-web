import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { AvatarSelect } from "components";

const SelectAvatar = () => (
  <Stack justifyContent="center" alignItems="center" height="80vh">
    <Grid overflow="scroll" width="100%">
      <AvatarSelect />
    </Grid>
  </Stack>
);

export default SelectAvatar;
