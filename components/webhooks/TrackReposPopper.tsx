import { useState, MouseEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import type { SxProps } from "@mui/system";
import { CreateWebhooksButton, TrackRepoCheckboxes } from "components";

// TODO: Handle case where user doesn't have any public repos
export const TrackReposPopper = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "calendar-popper" : undefined;
  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CreateWebhooksButton />
        <Button
          aria-describedby={id}
          variant="text"
          onClick={(event: MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
          sx={{ height: 60 }}
        >
          <Typography
            sx={{ fontSize: 12 }}
          >{`You can also select repos individually, if you'd prefer`}</Typography>
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Paper elevation={0} sx={{ borderRadius: 10 }}>
            <Box sx={containerSx}>
              <TrackRepoCheckboxes />
            </Box>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 480,
  borderRadius: 10,
} as SxProps;
