import type { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ChatSvg from "@mui/icons-material/Chat";
import GitHubSvg from "@mui/icons-material/GitHub";
import LogoutSvg from "@mui/icons-material/Logout";
import AvatarSvg from "@mui/icons-material/AccountCircle";
import { useAuth, signOutUser } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";
import { CalendarPopper, ProgressRing } from "components";
import { openUrl } from "utils";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export const Navbar = () => {
  const router = useRouter();
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const { isOnboarding, githubAvatarUrl } = userData;

  const speedDialActions = [
    {
      icon: <GitHubSvg />,
      name: "Go to GitHub",
      onClick: openUrl(`${GITHUB_BASE_URL}${userId}`),
    },
    {
      icon: <ChatSvg />,
      name: "Leave feedback",
      onClick: openUrl(ISSUES_URL),
    },
    {
      icon: <AvatarSvg />,
      name: "Change avatar",
      onClick: () => router.push("/select-avatar"),
    },
    { icon: <LogoutSvg />, name: "Sign out", onClick: signOutUser },
  ];

  if (isOnboarding) return <OnboardingNavbar />;
  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="transparent"
        sx={{ borderRadius: 20, boxShadow: 0 }}
      >
        <Stack direction="row" alignItems="center" mt={2}>
          <NavbarItem
            icon={<ProgressRing noLottie size={35} />}
            href="/"
            tooltip="View today's progress"
          >
            <Typography>{`View today`}</Typography>
          </NavbarItem>
          <Divider
            orientation="vertical"
            sx={{ mr: 1, color: "primary", height: 30, width: "2px" }}
          />
          <CalendarPopper />
          <Divider
            orientation="vertical"
            sx={{ ml: 1, color: "primary", height: 30, width: "2px" }}
          />
          <Divider orientation="vertical" color="primary" />
          <NavbarItem
            icon={<Image src="/repo-icon.png" width={30} height={30} />}
            href="/manage-repos"
            tooltip="Manage repos"
          >
            <Typography>{`Manage repos`}</Typography>
          </NavbarItem>
          <Stack width="50%">
            <Stack height={60} p={1} pr={2} alignSelf="flex-end">
              <SpeedDial
                ariaLabel="speed-dial"
                icon={<Avatar alt={userId} src={githubAvatarUrl} />}
                direction="down"
                FabProps={{ size: "medium" }}
              >
                {speedDialActions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>
            </Stack>
          </Stack>
        </Stack>
      </AppBar>
    </Container>
  );
};

const OnboardingNavbar = () => (
  <Container>
    <Stack direction="row" justifyContent="flex-end" mt={3}>
      <Tooltip title="Sign out">
        <IconButton onClick={signOutUser}>
          <LogoutSvg />
        </IconButton>
      </Tooltip>
    </Stack>
  </Container>
);

interface Props {
  icon: JSX.Element;
  href: string;
  tooltip: string;
}

const NavbarItem: FC<Props> = ({ icon, href, tooltip, children }) => (
  <Link href={href} passHref>
    <Tooltip title={tooltip}>
      <Button startIcon={icon} sx={{ p: 2, height: 60 }}>
        {children}
      </Button>
    </Tooltip>
  </Link>
);

const GITHUB_BASE_URL = "https://github.com/";
const ISSUES_URL = `${GITHUB_BASE_URL}bscott4/dev-rings-web/issues`;
