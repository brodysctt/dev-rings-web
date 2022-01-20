import Link from "@mui/material/Link";

export const TextLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} target="_blank" rel="noopener" underline="none">
    {text}
  </Link>
);
