import type { NextPage } from "next";
import Link from "next/link";

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
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: githubUser },
    } = user;
    console.log(`this mans is logged in: ${githubUser}`);

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
        <CreateWebhooksButton user={githubUser} />
        <Link href="/webhooks">
          Feel free to check out the webhooks once you've clicked the button ☝️
        </Link>
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
