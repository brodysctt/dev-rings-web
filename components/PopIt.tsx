import { useState, MouseEvent, FC } from "react";
import { Box, Button, Popper, Paper, ClickAwayListener } from "@mui/material";
import type { SxProps } from "@mui/system";

interface Props {
  id: string;
  icon: JSX.Element;
  paperSx?: SxProps;
}

// TODO: Listen for Firestore update to User doc (and close on update)
export const PopIt: FC<Props> = ({ id, children, icon, paperSx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // TODO: Figure out how to close popper on submit within children
  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box>
        <Button
          aria-describedby={open ? id : undefined}
          variant="text"
          onClick={(event: MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
          sx={{ height: 60 }}
        >
          {icon}
        </Button>
        <Popper id={open ? id : undefined} open={open} anchorEl={anchorEl}>
          <Paper elevation={0} sx={paperSx}>
            {children}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
