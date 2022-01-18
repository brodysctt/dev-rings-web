import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";

const ManageRepos: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="md">
      <Stack alignItems="center" height="80vh" mt={20}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          width={1}
        >
          <Box width={isMobile ? 1 : "40%"}>
            <TrackEmAllButton />
          </Box>
          <Divider
            flexItem
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={isMobile ? { my: 2 } : { ml: 5 }}
          />
          <Box width={isMobile ? 1 : "60%"}>
            <TrackRepoInput
              sx={isMobile ? { ml: 0, mt: 0 } : { ml: 5, mt: 1 }}
            />
          </Box>
        </Stack>
        <Divider sx={{ width: "70%", my: 3 }} />
        <TrackRepoCheckboxes />
      </Stack>
    </Container>
  );
};

export default ManageRepos;
