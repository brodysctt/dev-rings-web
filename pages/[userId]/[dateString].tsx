import type { GetServerSideProps } from "next";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import { Box, Typography } from "@mui/material";
import { DevRing, Log } from "components";
import Cookies from "cookies";

const DevRings = ({ log }: { log: Log }) => {
  const { user } = useAuth();
  if (!user) return null;
  const userId = getUserId(user);

  const [dateString] = log;
  const date = new Date(dateString);
  // TODO: Test this
  const isToday = date === new Date();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
      {/* TODO: Add color to theme */}
      <Typography sx={{ mb: 3, color: "#a2a2a2" }}>{dateString}</Typography>
      <DevRing userId={userId} log={log} isToday={isToday} />
    </Box>
  );
};

export default DevRings;

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
