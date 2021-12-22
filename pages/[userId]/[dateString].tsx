import type { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useAuth } from "@lib/firebase/auth";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import {
  EventsPopper,
  TodayDevRing,
  ProgressRing,
  Log,
  getDayEvents,
} from "components";
import Cookies from "cookies";
import { db, RepoEvent } from "@lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const DevRing = ({ log }: { log: Log }) => {
  const userId = useAuth();
  const [events, setEvents] = useState<RepoEvent[] | null>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
        const eventsSnap = await getDocs(
          collection(db, "users", userId, "events")
        );

        if (eventsSnap && eventsSnap.docs.length) {
          const events = eventsSnap.docs.map((doc) =>
            doc.data()
          ) as RepoEvent[];
          setEvents(events);
        }
      }
    })();
  });

  // Do I want this if there are no events?
  if (!userId || !events) return null;

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
        <TodayDevRing userId={userId} />
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
