import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Lottie from "react-lottie-player";
import maleDev0 from "public/maleDev0.json";
import femaleDev0 from "public/femaleDev0.json";
import maleDev1 from "public/maleDev1.json";
import femaleDev1 from "public/femaleDev1.json";
import maleDev2 from "public/maleDev2.json";
import femaleDev2 from "public/femaleDev2.json";
import maleDev3 from "public/maleDev3.json";
import femaleDev3 from "public/femaleDev3.json";
import { useAuth } from "@lib/firebase/auth";
import { setAvatarId, useUserDoc } from "@lib/firebase/firestore";

export const AVATARS = [
  ["👨🏻‍💻", maleDev0],
  ["👩🏻‍💻", femaleDev0],
  ["👨🏽‍💻", maleDev1],
  ["👩🏽‍💻", femaleDev1],
  ["👨🏾‍💻", maleDev2],
  ["👩🏾‍💻", femaleDev2],
  ["👨🏿‍💻", maleDev3],
  ["👩🏿‍💻", femaleDev3],
];

export const Avatar = ({ size = 500 }: { size?: number }) => {
  const userData = useUserDoc();
  if (!userData) return null;
  const { avatarId } = userData;
  const [lottieJson] = AVATARS.filter(([id]) => id === avatarId).map(
    ([, lottieJson]) => lottieJson
  );
  return (
    <Box height={size} width={size}>
      {/*
      // @ts-ignore */}
      <Lottie loop animationData={lottieJson} play speed={0.7} />
    </Box>
  );
};

// TODO: This needs to use the Avatar component
export const AvatarCarousel = ({ size = 400 }: { size?: number }) => {
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
                onClick={async () => await setAvatarId(userId, id as string)}
                sx={{
                  border: 1,
                  borderColor: isCurrentAvatar ? "primary.main" : "white",
                }}
              >
                <Stack>
                  <Box height={size} width={size}>
                    {/*
                    // @ts-ignore */}
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
