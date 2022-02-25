import { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { dayjs, isNewTimezone } from "@lib/dayjs";
import { useAuth } from "@lib/firebase/auth";
import { setTimezone } from "@lib/firebase/firestore";

export const NewTimezoneAlert = ({ tz }: { tz: string }) => {
  const userId = useAuth();
  useEffect(() => {
    if (!userId) return;
    if (isNewTimezone(tz)) {
      toast(
        <Stack>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography color="primary.main" sx={{ mr: 0.5 }}>
              {`New timezone detected`}
            </Typography>
            <Image src="/blobdetective.png" width={20} height={20} />
          </Box>
          <Button
            variant="contained"
            onClick={() => setTimezone(userId, dayjs.tz.guess())}
          >{`change to ${dayjs.tz.guess()}`}</Button>
        </Stack>,
        {
          autoClose: false,
          hideProgressBar: true,
        }
      );
    }
  }, []);
  return null;
};
