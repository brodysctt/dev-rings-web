import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Box, Typography } from "@mui/material";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignInButton, DevRing } from "components";

const DevRings = ({ date }: { date: string }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <Box>
        <Typography>Initialising User...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }
  if (user) {
    // TODO: *Consider* refactoring away from this pattern, and instead slapping username in the url with a dynamic directory 👀
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: userId },
    } = user;
    console.log(`this mans is logged in: ${userId}`);

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
        <DevRing userId={userId} date={date} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <SignInButton />
    </Box>
  );
};

export default DevRings;

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    // TODO: What's the best way to solve for this?
    // @ts-ignore
    params: { date },
  } = context;
  return {
    props: { date }, // will be passed to the page component as props
  };
};

// TODO: Use fallback to ensure only valid dates are used, and to show a 404 otherwise
export const getStaticPaths: GetStaticPaths<{ date: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
