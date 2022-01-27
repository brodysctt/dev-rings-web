import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PopIt, UpgradedRing, RingValues } from "components";
import { EventsTimeline } from "./EventsTimeline";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";

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
      {/* <ProgressRing values={values} /> */}
      <Stack direction="row">
        <UpgradedRing values={values} />
      </Stack>
      <PopIt
        id="View events"
        sx={{ mt: 4 }}
        icon={
          <Stack px={0.8} py={2} height={25} sx={iconSx}>
            <CommitSvg />
          </Stack>
        }
      >
        <EventsTimeline events={events} />
      </PopIt>
    </Stack>
  </Stack>
);

const iconSx = {
  justifyContent: "center",
  bgcolor: "#111033", //"primary.main",
  borderRadius: 50,
  px: 0.8,
  py: 2,
};

export const CommitSvg = () => (
  <Stack alignItems="center" sx={{ height: 20, width: 20 }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V9.17071C14.1652 9.58254 15 10.6938 15 12C15 13.3062 14.1652 14.4175 13 14.8293V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V14.8293C9.83481 14.4175 9 13.3062 9 12C9 10.6938 9.83481 9.58254 11 9.17071V4ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        fill="white"
      />
    </svg>
  </Stack>
);
