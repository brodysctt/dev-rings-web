import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  icon: string | JSX.Element;
  text: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Header = ({ icon, text, variant = "h6" }: Props) => {
  const isImagePath = typeof icon === "string";
  return (
    <Stack direction="row">
      <Typography variant={variant} color="primary" sx={{ mr: 1 }}>
        {text}
      </Typography>
      {isImagePath ? <Image src={icon} width={30} height={30} /> : icon}
    </Stack>
  );
};
