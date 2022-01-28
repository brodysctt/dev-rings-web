import Image from "next/image";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AvatarCarousel } from "components";

const SelectAvatar = () => (
  <Stack justifyContent="center" alignItems="center" height="80vh">
    <Stack direction="row" mb={2}>
      <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
        {`Select a new avatar`}
      </Typography>
      <Image src="/blobpopcorn.png" width={30} height={30} />
    </Stack>
    <Grid overflow="scroll" width="100%">
      <AvatarCarousel />
    </Grid>
  </Stack>
);

export default SelectAvatar;
