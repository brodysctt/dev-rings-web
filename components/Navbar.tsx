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
import MenuSvg from "@mui/icons-material/Menu";
import AvatarSvg from "@mui/icons-material/AccountCircle";
import { useAuth, signOutUser } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";
import { CalendarPopper, ProgressRing } from "components";
import { openUrl } from "utils";

export const Navbar = () => {
  const router = useRouter();
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const { isOnboarding } = userData;

  const speedDialActions = [
    {
      icon: <GitHubSvg />,
      name: "Take me to GitHub",
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
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="space-between" pt={3}>
        <Stack direction="row">
          <NavbarItem href="/" tooltip="View today's progress">
            <ProgressRing
              size={35}
              values={[
                [0, 1],
                [0, 1],
              ]}
            />
          </NavbarItem>
          <CalendarPopper />
          <NavbarItem href="/manage-repos" tooltip="Manage repos">
            <Image src="/repo-icon.png" width={32} height={32} />
          </NavbarItem>
        </Stack>
        <Stack height={60} p={1} pr={2}>
          <SpeedDial
            ariaLabel="speed-dial"
            icon={<MenuSvg />}
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
    </Container>
  );
};

const OnboardingNavbar = () => (
  <Container maxWidth="md">
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
  href: string;
  tooltip: string;
}

const NavbarItem: FC<Props> = ({ href, tooltip, children }) => (
  <Link href={href} passHref>
    <Tooltip title={tooltip}>
      <Button sx={{ p: 2, height: 60, width: 60 }}>{children}</Button>
    </Tooltip>
  </Link>
);

const GITHUB_BASE_URL = "https://github.com/";
const ISSUES_URL = `${GITHUB_BASE_URL}bscott4/dev-rings-web/issues`;
