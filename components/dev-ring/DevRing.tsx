import type { FC } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
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
    <Stack
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="100%"
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box
          p={2}
          sx={{
            ...(isToday
              ? {
                  width: 298,
                  border: 1,
                  borderColor: "#EAEDFA",
                  borderRadius: 6,
                  boxShadow: "1px 2px #EAEDFA",
                }
              : { width: 398 }),
          }}
        >
          {isToday && <ManageGoals />}
        </Box>
        <Stack alignItems="center" mx={8}>
          <Typography color="text.secondary" sx={{ mb: 6 }}>
            {dayjs(dateString).format("LL")}
          </Typography>
          <Stack direction="row">
            <ProgressRing values={values} />
          </Stack>
          <PopIt
            id="View events"
            sx={{ mt: 4 }}
            icon={
              <Stack
                px={0.8}
                py={2}
                height={25}
                sx={{
                  justifyContent: "center",
                  bgcolor: "primary.main", // "#111033"
                  borderRadius: 50,
                  px: 0.8,
                  py: 2,
                }}
              >
                <CommitSvg />
              </Stack>
            }
          >
            <EventsTimeline events={events} />
          </PopIt>
        </Stack>
        <Stack alignItems="flex-start">
          <Typography
            variant="h4"
            color="primary"
          >{`${commitsActual}/${commitsGoal} Commits`}</Typography>
          <Typography
            variant="h4"
            color="secondary"
          >{`${prsActual}/${prsGoal} Pull requests`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
