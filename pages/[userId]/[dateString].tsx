import type { NextPage, GetServerSideProps } from "next";
import { DevRing } from "components";
import { getDayEvents } from "@lib/dayjs";
import { useCollection, Log, RepoEvent } from "@lib/firebase/firestore";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import Cookies from "cookies";

const Day: NextPage<{ log: Log }> = ({ log }) => {
  const events = useCollection("events") as RepoEvent[] | null;
  const [dateString, { commits, prs }] = log;
  const dayEvents = getDayEvents(events, dateString);
  if (!dayEvents) return null;
  return (
    <DevRing
      dateString={dateString}
      events={dayEvents}
      values={[
        commits ? [commits.actual, commits.goal] : [0, 1],
        prs ? [prs.actual, prs.goal] : [0, 1],
      ]}
    />
  );
};

export default Day;

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
