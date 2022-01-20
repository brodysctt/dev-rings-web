import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie-player";
// @ts-ignore
import zenDeveloperJson from "https://assets9.lottiefiles.com/packages/lf20_9e8yoqkm.json";

export const GetStarted = () => (
  <Stack alignItems="center">
    <Stack direction="row">
      <Typography align="center" variant="h6" color="primary" mr={1}>
        {`Push a commit to kick off today's progress`}
      </Typography>
      <Stack>
        <Image src="/blobhighfive.png" width={30} height={30} />
      </Stack>
    </Stack>
    <Tooltip title="More inclusive animations coming soon">
      <Box height={500} width={500}>
        <Lottie loop animationData={zenDeveloperJson} play speed={0.7} />
      </Box>
    </Tooltip>
  </Stack>
);
