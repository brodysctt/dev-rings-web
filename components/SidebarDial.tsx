import { useRouter } from "next/router";
import { useAuth, signOutUser } from "@lib/firebase/auth";
import { useUserDoc } from "@lib/firebase/firestore";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { AddSvg, ChatSvg, GitHubSvg, MenuSvg, LogoutSvg } from "components";

export const SidebarDial = () => {
  const userId = useAuth();
  const userData = useUserDoc();
  const router = useRouter();

  if (!userId || !userData) return null;
  const [, { isOnboarding }] = userData;

  let actions = [];

  if (!isOnboarding)
    actions.push({
      icon: <AddSvg />,
      name: "Manage repos",
      onClick: () => router.push("/repos"),
    });

  actions.push(
    ...[
      {
        icon: <GitHubSvg />,
        name: "Take me to GitHub",
        onClick: () => window.open(`${GITHUB_BASE_URL}${userId}`),
      },
      {
        icon: <ChatSvg />,
        name: "Leave feedback",
        onClick: () => window.open(ISSUES_URL),
      },
      { icon: <LogoutSvg />, name: "Sign out", onClick: signOutUser },
    ]
  );
  return (
    <Box
      sx={{
        flex: "none",
        transform: "translateZ(0px)",
        height: 50,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<MenuSvg />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

const GITHUB_BASE_URL = "https://github.com/";
const ISSUES_URL = `${GITHUB_BASE_URL}bscott4/dev-rings-web/issues`;
