import { useAuth } from "@lib/hooks";
import type { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import { DevRing, Log } from "components";
import { firebaseAdmin } from "@lib/firebaseAdmin";
import Cookies from "cookies";

const DevRings = ({ log }: { log: Log }) => {
  const { user } = useAuth();
  console.log("here be the user from the useAuth hook");
  console.dir(user);

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
        height: "60vh",
        width: "100%",
      }}
    >
      <DevRing log={log} isToday={isToday} />
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

    if (!cookie) {
      throw new Error("no cookie");
    }

    const token = await firebaseAdmin.auth().verifyIdToken(cookie);
    console.log(`here be the validated token`);
    console.dir(token);

    const db = firebaseAdmin.firestore();

    const logRef = db
      .collection("users")
      .doc(userId)
      .collection("logs")
      .doc(dateString);
    const logDoc = await logRef.get();

    if (!logDoc.exists) {
      throw new Error(`doc doesn't exist!`);
    }

    return {
      props: { log: [dateString, logDoc.data()] as Log },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/enter" });
    context.res.end();

    return { props: {} as never };
  }
};
