import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Lottie from "react-lottie-player";
import avatar0 from "public/avatar0.json";
import avatar1 from "public/avatar1.json";
import avatar2 from "public/avatar2.json";
import avatar3 from "public/avatar3.json";
import avatar4 from "public/avatar4.json";
import avatar5 from "public/avatar5.json";
import avatar6 from "public/avatar6.json";
import avatar7 from "public/avatar7.json";
import { useAuth } from "@lib/firebase/auth";
import { setAvatarId, useUserDoc } from "@lib/firebase/firestore";

type AvatarJson =
  | typeof avatar0
  | typeof avatar1
  | typeof avatar2
  | typeof avatar3
  | typeof avatar4
  | typeof avatar5
  | typeof avatar6
  | typeof avatar7;

export const AVATARS: Array<[string, AvatarJson]> = [
  ["avatar0", avatar0],
  ["avatar1", avatar1],
  ["avatar2", avatar2],
  ["avatar3", avatar3],
  ["avatar4", avatar4],
  ["avatar5", avatar5],
  ["avatar6", avatar6],
  ["avatar7", avatar7],
];

export const Avatar = ({ size = 500 }: { size?: number }) => {
  const userData = useUserDoc();
  if (!userData) return null;
  if (!userData.avatarId)
    return (
      <Box height={size} width={size}>
        <Lottie loop animationData={avatar3} play speed={0.7} />
      </Box>
    );

  const { avatarId } = userData;
  const [lottieJson] = AVATARS.filter(([id]) => id === avatarId).map(
    ([, lottieJson]) => lottieJson
  );
  return (
    <Box height={size} width={size}>
      <Lottie loop animationData={lottieJson} play speed={0.7} />
    </Box>
  );
};

export const AvatarSelect = ({ size = 400 }: { size?: number }) => {
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const { avatarId } = userData;
  return (
    <Grid container spacing={2} wrap="nowrap" pt={1} px={3} mt={3}>
      {AVATARS.map(([id, lottieJson], i) => {
        const isCurrentAvatar = id === avatarId;
        return (
          <Grid item key={i}>
            <Stack alignItems="center">
              <Button
                disableRipple
                onClick={async () => await setAvatarId(userId, id)}
                sx={{
                  border: 1,
                  borderColor: isCurrentAvatar ? "primary.main" : "white",
                }}
              >
                <Stack>
                  <Box height={size} width={size}>
                    <Lottie loop animationData={lottieJson} play speed={0.7} />
                  </Box>
                </Stack>
              </Button>
              {isCurrentAvatar && (
                <Typography color="primary.main" mt={2}>
                  Selected
                </Typography>
              )}
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};
