import { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { SxProps } from "@mui/system";
import {
  PopIt,
  TrackEmAllButton,
  TrackRepoCheckboxes,
  TrackRepoInput,
} from "components";

export const ReposPopper = () => {
  return (
    <PopIt
      id="Manage repos"
      icon={<Image src="/repo-icon.png" width={32} height={32} />}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 600,
        }}
      >
        <BasicTabs />
      </Box>
    </PopIt>
  );
};

const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Track all public repos" {...a11yProps(0)} />
          <Tab label="Track repo by URL" {...a11yProps(1)} />
          <Tab label="Check repo to track it" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TrackEmAllButton />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrackRepoInput />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TrackRepoCheckboxes />
      </TabPanel>
    </Box>
  );
};

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
