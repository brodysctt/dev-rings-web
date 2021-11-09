import type { NextPage } from "next";

import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignInButton, SignOutButton, CreateWebhooksButton } from "components";

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
    const { email } = user;
    console.log(`this mans is logged in: ${email}`);
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
        <CreateWebhooksButton email={email} />
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
