import { useContext } from "react";
import { UserContext } from "@lib/context";
import type { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import { SignInButton, DevRing, Log } from "components";
import { db } from "@lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const DevRings = ({ log }: { log: Log }) => {
  const { userId } = useContext(UserContext);
  if (!userId) {
    return <SignInButton />;
  }

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
  const {
    // TODO: What's the best way to solve for this?
    // @ts-ignore
    params: { userId, dateString },
  } = context;

  const logRef = doc(db, "users", userId, "logs", dateString);
  const logSnapshot = await getDoc(logRef);
  return {
    props: { log: [dateString, logSnapshot.data()] as Log },
  };
};
