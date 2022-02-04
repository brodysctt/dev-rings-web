import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { AvatarCarousel } from "components";

const SelectAvatar = () => (
  <Stack justifyContent="center" alignItems="center" height="80vh">
    <Grid overflow="scroll" width="100%">
      <AvatarCarousel />
    </Grid>
  </Stack>
);

export default SelectAvatar;
