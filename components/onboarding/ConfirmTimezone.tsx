import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useAuth } from "@lib/firebase/auth";
import { setTimezone } from "@lib/firebase/firestore";
import { dayjs } from "@lib/dayjs";

export const ConfirmTimezone = ({ onSuccess }: { onSuccess: () => void }) => {
  const userId = useAuth();
  if (!userId) return null;

  const onConfirm = () => {
    setTimezone(userId, dayjs.tz.guess());
    onSuccess();
  };
  return (
    <Stack direction="row" mt={2}>
      <Button
        variant="contained"
        sx={{ mr: 2 }}
        onClick={onConfirm}
      >{`Yes, nailed it`}</Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={vpnToast}
      >{`No, I use a VPN`}</Button>
    </Stack>
  );
};

const vpnToast = () =>
  toast(
    <Stack direction="row" alignItems="center">
      <Typography mr={1}>{`Well, toggle it off then`}</Typography>
      <Image src={"/blobfingerguns.png"} width={30} height={30} />
    </Stack>
  );
