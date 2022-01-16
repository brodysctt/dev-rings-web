import type { NextPage, GetServerSideProps } from "next";
import { dayjs } from "@lib/dayjs";
import { useCollection, Log, RepoEvent } from "@lib/firebase/firestore";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import { getDayEvents } from "@lib/dayjs";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { CommitSvg, EventsTimeline, PopIt, ProgressRing } from "components";
import Cookies from "cookies";

const DevRing: NextPage<{ log: Log }> = ({ log }) => {
  const events = useCollection("events") as RepoEvent[] | null;
  const [dateString, { actual, goal }] = log;
  const dayEvents = getDayEvents(events, dateString);
  if (!dayEvents) return null;

  return (
    <Box sx={containerSx}>
      <Typography color="text.secondary">
        {dayjs(dateString).format("LL")}
      </Typography>
      <Box sx={devRingSx}>
        <ProgressRing values={[actual, goal]} />
        <PopIt id="View events" icon={<CommitSvg />}>
          <EventsTimeline events={dayEvents} />
        </PopIt>
      </Box>
    </Box>
  );
};

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100%",
} as SxProps;

const devRingSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as SxProps;

export default DevRing;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {
      req,
      res,
      // @ts-ignore
      params: { userId, dateString },
    } = context;

    const cookies = new Cookies(req, res);
    const cookie = cookies.get("token");
    if (!cookie) throw new Error(`Cookie doesn't exist!`);
    const token = await verifyToken(cookie);
    if (!token) throw new Error(`Token verification failed`);

    const logDoc = await fetchLogDoc(userId, dateString);
    if (!logDoc.exists) throw new Error(`Doc doesn't exist!`);

    return {
      props: { log: [dateString, logDoc.data()] as Log },
    };
  } catch (err: any) {
    const { message } = err;
    const isAuthError =
      message === `Cookie doesn't exist!` ||
      message === `Token verification failed`;

    if (isAuthError)
      return {
        redirect: {
          destination: "/enter",
          permanent: false,
        },
      };

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
