import Image from "next/image";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TrackRepoCheckboxes, TrackRepoInput } from "components";

const ManageRepos: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="md">
      <Stack alignItems="center" height="80vh" mt={20}>
        <Stack direction="row" alignItems="center" mb={2}>
          <Typography
            variant="h6"
            color="primary"
            mr={1}
          >{`Feel free to track as many repos as you'd like`}</Typography>
          <Image src={"/blobclipboard.png"} width={30} height={30} />
        </Stack>
        <TrackRepoCheckboxes />
        <Divider sx={{ width: "70%", my: 3 }} />
        <Box width={isMobile ? 1 : "50%"}>
          <TrackRepoInput sx={isMobile ? { ml: 0, mt: 0 } : { ml: 5, mt: 1 }} />
        </Box>
      </Stack>
    </Container>
  );
};

export default ManageRepos;
