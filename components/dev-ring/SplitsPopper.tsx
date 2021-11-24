import Image from "next/image";
import { Box, Typography, Button, Popper, Fade, Paper } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import type { PushEvent } from "components";

export const SplitsPopper = ({ events }: { events: PushEvent[] }) => (
  <PopupState variant="popper" popupId="demo-popup-popper">
    {(popupState) => (
      <>
        <Button
          variant="text"
          {...bindToggle(popupState)}
          sx={{ height: 60, ml: 1 }}
        >
          <Image src="/commit.svg" width={20} height={20} />
        </Button>
        <Popper {...bindPopper(popupState)} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "2px solid #DCDEE6", //#CAD2F7 #DCDEE6
                    borderRadius: 10,
                    p: 2,
                  }}
                >
                  <Typography>Here be the commits on the day</Typography>
                  {events.map((event) => {
                    const { createdAt, eventType, repo, url } = event;
                    return (
                      <>
                        <Typography>
                          {createdAt.toDate().toDateString()}
                        </Typography>
                        <Typography>{eventType}</Typography>
                        <Typography>{repo}</Typography>
                        <Typography>{url} </Typography>
                      </>
                    );
                  })}
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      </>
    )}
  </PopupState>
);
