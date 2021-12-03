import { useContext } from "react";
import { UserContext } from "@lib/context";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Box } from "@mui/material";
import { SignInButton, DevRing, Log } from "components";

const DevRings = ({ dateString }: { dateString: string }) => {
  const { userId, logs } = useContext(UserContext);
  if (!userId) {
    return <SignInButton />;
  }
  if (!logs) {
    return null;
  }

  const date = new Date(dateString);
  // TODO: Test this
  const isToday = date === new Date();

  const log = logs.find((log) => {
    const [logDateString] = log;
    return logDateString === dateString;
  }) as Log;
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

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    // TODO: What's the best way to solve for this?
    // @ts-ignore
    params: { dateString },
  } = context;
  return {
    props: { dateString }, // will be passed to the page component as props
  };
};

// TODO: Use fallback to ensure only valid dates are used, and to show a 404 otherwise
export const getStaticPaths: GetStaticPaths<{ date: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
