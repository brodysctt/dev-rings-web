import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie-player";
import { useUserDoc } from "@lib/firebase/firestore";
import { AVATARS } from "components";

export const GetStarted = () => {
  const userData = useUserDoc();
  if (!userData) return null;
  const { avatarId } = userData;
  return (
    <Stack alignItems="center">
      <Stack direction="row">
        <Typography align="center" variant="h6" color="primary" mr={1}>
          {`Push a commit to kick off today's progress`}
        </Typography>
        <Stack>
          <Image src="/blobhighfive.png" width={30} height={30} />
        </Stack>
      </Stack>
      <Avatar {...{ avatarId }} />
    </Stack>
  );
};

const Avatar = ({ avatarId }: { avatarId: string }) => {
  const [lottieJson] = AVATARS.filter(([id]) => id === avatarId).map(
    ([, lottieJson]) => lottieJson
  );
  return (
    <Box height={500} width={500}>
      <Lottie loop animationData={lottieJson} play speed={0.7} />
    </Box>
  );
};
