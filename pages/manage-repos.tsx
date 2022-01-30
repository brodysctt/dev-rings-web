import { useState, FC, SyntheticEvent } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { ManageReposCheckboxes } from "components";

const ManageRepos: NextPage = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Stack alignItems="center">
        <Box sx={{ width: "90%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Manage public repos" />
              <Tab label="Manage private repos" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ManageReposCheckboxes />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stack direction="row">
              <Typography variant="h6" color="text.secondary" sx={{ mr: 1 }}>
                {`Coming soon`}
              </Typography>
              <Image src="/ablobjam.gif" width={30} height={30} />
            </Stack>
          </TabPanel>
        </Box>
      </Stack>
    </Container>
  );
};

export default ManageRepos;

interface Props {
  index: number;
  value: number;
}

const TabPanel: FC<Props> = ({ index, value, children }) => (
  <Stack role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </Stack>
);
