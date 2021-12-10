import type { GetServerSideProps } from "next";
import { useAuth, getUserId } from "@lib/firebase/auth";
import { verifyToken, fetchLogDoc } from "@lib/firebase-admin";
import { Box } from "@mui/material";
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
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
      }}
    >
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
    const token = cookies.get("token");

    if (!token) throw new Error("No token!");
    // TODO: Confirm this will error if it's not able to verify 👇
    await verifyToken(token);

    const logDoc = await fetchLogDoc(userId, dateString);
    if (!logDoc.exists) throw new Error(`Log doesn't exist!`);

    return {
      props: { log: [dateString, logDoc.data()] as Log },
    };
  } catch (err: any) {
    context.res.writeHead(302, { Location: "/enter" });
    context.res.end();

    return { props: {} as never };
  }
};
