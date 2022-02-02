import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PopIt, ProgressRing, RingValues } from "components";
import { EventsTimeline } from "./EventsTimeline";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";
import { CommitSvg } from "components/dev-ring/EventIcons";

interface Props {
  dateString?: string | undefined;
  events: RepoEvent[];
  values: RingValues;
}

export const DevRing = ({ dateString, events, values }: Props) => (
  <Stack justifyContent="center" alignItems="center" height="80vh">
    <Stack alignItems="center">
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
  </Stack>
);
