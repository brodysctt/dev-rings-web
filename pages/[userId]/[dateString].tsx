import type { NextPage, GetServerSideProps } from "next";
import { useCollection, Log, RepoEvent } from "@lib/firebase/firestore";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import { EventsPopper, Today, ProgressRing, getDayEvents } from "components";
import Cookies from "cookies";

const DevRing: NextPage<{ log: Log }> = ({ log }) => {
  const events = useCollection("events");
  // Do I want this if there are no events?
  if (!events) return null;

  const [dateString, { actual, goal }] = log;

  // TODO: Refactoring with dayjs
  const date = new Date(dateString);
  // TODO: Test this + refactor with dayjs
  const isToday = date === new Date();

  const dayEvents = getDayEvents(events as RepoEvent[], dateString);

  if (isToday)
    return (
      <Box sx={containerSx}>
        <Typography sx={{ mb: 3, color: "#a2a2a2" }}>{dateString}</Typography>
        <Today />
      </Box>
    );

  const hitGoal = actual - goal >= 0;
  const percent = hitGoal ? 100 : (actual / goal) * 100;

  return (
    <Box sx={containerSx}>
      <Typography sx={{ mb: 3, color: "#a2a2a2" }}>{dateString}</Typography>
      <Box sx={devRingSx}>
        <ProgressRing percent={percent} />
        <EventsPopper events={dayEvents} />
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
