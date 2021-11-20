import { useState, KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GoalModal } from "components";
import { signOutUser } from "helpers";

export const Sidebar = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const [goalModal, setGoalModal] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  // TODO: Pass the setGoalModal function down to SetGoalModal so that it closes lolol
  if (goalModal) {
    return <GoalModal userId={userId} />;
  }
  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ mr: 2 }}>
        <MenuIcon />
      </Button>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link href="/dev-rings">
              <ListItem button onClick={() => console.log("hi")} key={"wuz"}>
                💍
                <ListItemText primary={"View current ring"} sx={{ ml: 2 }} />
              </ListItem>
            </Link>
            <Link href="/enter">
              <ListItem
                button
                onClick={() => console.log("time to create another webhook")}
                key={"createWebhook"}
              >
                🪝
                <ListItemText primary={"Add webhooks"} sx={{ ml: 2 }} />
              </ListItem>
            </Link>
            <ListItem button onClick={() => setGoalModal(true)} key={"setGoal"}>
              🎯
              <ListItemText primary={"Set new goal"} sx={{ ml: 2 }} />
            </ListItem>
            <ListItem
              button
              onClick={() => window.open(`${GITHUB_BASE_URL}${userId}`)}
              key={"wuz"}
            >
              <Image src="/github.png" width={20} height={20} />
              <ListItemText primary={"Take me to GitHub"} sx={{ ml: 2 }} />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => window.open(ISSUES_URL)}
              key={"feedback"}
            >
              🙋‍♀️
              <ListItemText primary={"Leave feedback"} sx={{ ml: 2 }} />
            </ListItem>
            <ListItem button onClick={signOutUser} key={"logout"}>
              👋
              <ListItemText primary={"Sign out"} sx={{ ml: 2 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

const GITHUB_BASE_URL = "https://github.com/";
const ISSUES_URL = `${GITHUB_BASE_URL}bscott4/dev-rings-web/issues`;
