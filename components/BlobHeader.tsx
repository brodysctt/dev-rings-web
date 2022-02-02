import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  text: string;
  blob: string;
}

export const BlobHeader = ({ text, blob }: Props) => (
  <Stack direction="row">
    <Typography variant="h5" color="primary" sx={{ mr: 1 }}>
      {text}
    </Typography>
    <Image src={blob} width={30} height={30} />
  </Stack>
);
