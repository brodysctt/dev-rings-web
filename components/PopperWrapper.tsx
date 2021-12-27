import { useState, MouseEvent, FC } from "react";
import { Box, Button, Popper, Paper, ClickAwayListener } from "@mui/material";
import type { SxProps } from "@mui/system";

interface Props {
  id: string;
  buttonVariant: "contained" | "outlined" | "text";
  icon: JSX.Element;
}

export const PopperWrapper: FC<Props> = ({
  id,
  buttonVariant,
  children,
  icon,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // TODO: Figure out how to close popper on submit within children
  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box>
        <Button
          aria-describedby={open ? id : undefined}
          variant={buttonVariant}
          onClick={(event: MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
          sx={{ height: 60 }}
        >
          {icon}
        </Button>
        <Popper id={open ? id : undefined} open={open} anchorEl={anchorEl}>
          <Paper elevation={0}>
            <Box sx={containerSx}>{children}</Box>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;
