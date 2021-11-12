import type { NextPage } from "next";

import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignInButton, SignOutButton, ManageWebhooks } from "components";

const Enter: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: userId },
    } = user;
    console.log(`this mans is logged in: ${userId}`);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <ManageWebhooks userId={userId} />
        <SignOutButton />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <SignInButton />
    </div>
  );
};

export default Enter;
