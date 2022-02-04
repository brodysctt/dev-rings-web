import type { FC } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PopIt, ManageGoals, ProgressRing, RingValues } from "components";
import { EventsTimeline } from "./EventsTimeline";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";
import { CommitSvg } from "components/dev-ring/EventIcons";

interface Props {
  dateString?: string | undefined;
  events: RepoEvent[];
  isToday?: boolean;
  values: RingValues;
}

export const DevRing: FC<Props> = (props) => {
  const { dateString, events, isToday = false, values } = props;
  const [[commitsActual, commitsGoal], [prsActual, prsGoal]] = values;
  return (
    <Container>
      <Grid container alignItems="center" height="80vh">
        <Grid item>
          {isToday && (
            <Box
              sx={{
                display: "inline-block",
                alignSelf: "flex-end",
                p: 2,
                width: "auto",
                border: 1,
                borderColor: "#EAEDFA",
                borderRadius: 6,
                boxShadow: "1px 2px #EAEDFA",
              }}
            >
              <ManageGoals isToday />
            </Box>
          )}
        </Grid>
        <Grid xs={6}>
          <Stack alignItems="center">
            <Typography color="text.secondary" sx={{ mb: 6 }}>
              {dayjs(dateString).format("LL")}
            </Typography>
            <ProgressRing values={values} />
            <PopIt
              id="View events"
              sx={{ mt: 4 }}
              icon={
                <Stack
                  justifyContent="center"
                  px={0.8}
                  py={2}
                  height={25}
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 50,
                  }}
                >
                  <CommitSvg />
                </Stack>
              }
            >
              <EventsTimeline events={events} />
            </PopIt>
          </Stack>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            color="primary"
          >{`${commitsActual}/${commitsGoal} Commits`}</Typography>
          <Typography
            variant="h4"
            color="secondary"
          >{`${prsActual}/${prsGoal} Pull requests`}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
