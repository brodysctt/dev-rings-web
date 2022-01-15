import { useState, MouseEvent, FC } from "react";
import {
  Box,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import type { SxProps } from "@mui/system";

interface Props {
  id: string;
  icon: JSX.Element;
  paperSx?: SxProps;
}

export const PopIt: FC<Props> = ({ id, children, icon, paperSx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box>
        <Tooltip title={id} PopperProps={open ? { open: !open } : {}}>
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
        </Tooltip>
        <Popper
          id={open ? id : undefined}
          open={open}
          anchorEl={anchorEl}
          onClick={() => setAnchorEl(null)}
          modifiers={[
            {
              name: "flip",
              enabled: false,
            },
          ]}
        >
          <Paper elevation={0} sx={paperSx}>
            {children}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
