import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Lottie from "react-lottie-player";
// @ts-ignore
import zenDeveloperJson from "https://assets9.lottiefiles.com/packages/lf20_9e8yoqkm.json";
import zenFemaleDeveloperJson from "public/avatar-female.json";
import { useAuth } from "@lib/firebase/auth";
import { setAvatar } from "@lib/firebase/firestore";

const avatars = [
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

export const AvatarCarousel = ({ onSuccess }: { onSuccess?: () => void }) => {
  const userId = useAuth();
  if (!userId) return null;
  return (
    <Grid
      container
      spacing={4}
      wrap="nowrap"
      height="100%"
      width="100%"
      pt={1}
      // overflow="scroll"
    >
      {avatars.map(([avatarId, lottieJson]) => (
        <Grid item>
          <Stack>
            <Button
              onClick={async () => {
                await setAvatar(userId, avatarId);
                if (onSuccess) onSuccess();
              }}
            >
              <Stack>
                <Box height={400} width={400}>
                  <Lottie loop animationData={lottieJson} play speed={0.7} />
                </Box>
              </Stack>
            </Button>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
