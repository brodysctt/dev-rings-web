import type { NextPage } from "next";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

const Enter: NextPage = () => {
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
      <SignOutButton />
    </div>
  );
};

export default Enter;
