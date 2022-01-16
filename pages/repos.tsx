import { useState } from "react";
import type { NextPage } from "next";
import type { SxProps } from "@mui/system";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TrackRepoInput, TrackPublicRepos } from "components";

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: 1,
  height: "80vh",
  mt: 10,
} as SxProps;

const ManageRepos: NextPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={containerSx}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} sx={{ width: "60vw" }}>
          <Tab label="Manage public repos" sx={{ width: "50%" }} />
          <Tab label="Track private repos" sx={{ width: "50%" }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TrackPublicRepos />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrackRepoInput />
      </TabPanel>
    </Box>
  );
};

export default ManageRepos;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, px: 3, pb: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
