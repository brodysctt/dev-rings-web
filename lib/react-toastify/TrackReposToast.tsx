import Image from "next/image";
import { toast } from "react-toastify";
import { Stack, Typography } from "@mui/material";

export const trackReposToast = () =>
  toast(
    <Stack direction="row">
      <Typography color="primary.main" sx={{ mr: 0.5 }}>
        {`Track as many repos as you'd like`}
      </Typography>
      <Image src="/blobbongos.gif" width={20} height={20} />
    </Stack>,
    {
      hideProgressBar: true,
    }
  );
