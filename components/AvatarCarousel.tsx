import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Lottie from "react-lottie-player";
// @ts-ignore
import zenDeveloperJson from "https://assets9.lottiefiles.com/packages/lf20_9e8yoqkm.json";
import zenFemaleDeveloperJson from "public/avatar-female.json";
import { useAuth } from "@lib/firebase/auth";
import { setAvatar, useUserDoc } from "@lib/firebase/firestore";

export const AVATARS = [
  ["👨‍💻", zenDeveloperJson],
  ["👩‍💻", zenFemaleDeveloperJson],
  ["👨🏻‍💻", zenDeveloperJson],
  ["👩🏻‍💻", zenFemaleDeveloperJson],
  ["🧑🏼‍💻", zenDeveloperJson],
  ["👩🏼‍💻", zenFemaleDeveloperJson],
  ["👨🏽‍💻", zenDeveloperJson],
  ["👩🏽‍💻", zenFemaleDeveloperJson],
  ["👨🏾‍💻", zenDeveloperJson],
  ["👩🏾‍💻", zenFemaleDeveloperJson],
  ["👨🏿‍💻", zenDeveloperJson],
  ["👩🏿‍💻", zenFemaleDeveloperJson],
];

export const AvatarCarousel = () => {
  const userId = useAuth();
  const userData = useUserDoc();
  if (!userId || !userData) return null;
  const [, { avatarId }] = userData;
  return (
    <Grid container spacing={2} wrap="nowrap" pt={1} px={3}>
      {AVATARS.map(([id, lottieJson], i) => {
        const isCurrentAvatar = id === avatarId;
        return (
          <Grid item key={i}>
            <Stack alignItems="center">
              <Button
                disableRipple
                variant={isCurrentAvatar ? "outlined" : "text"}
                onClick={async () => await setAvatar(userId, id)}
              >
                <Stack>
                  <Box height={400} width={400}>
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
