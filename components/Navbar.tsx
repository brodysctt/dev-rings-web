import Link from "next/link";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOutButton, AddWebhookInput } from "components";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  if (user) {
    const {
      // @ts-ignore
      reloadUserInfo: { screenName: userId },
    } = user;
    console.log(`this mans is logged in: ${userId}`);

    return (
      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          position: "fixed",
          top: 0,
          padding: "10px 10vw",
          zIndex: 99,
        }}
      >
        <Link href="/dev-rings">
          <button className="btn-logo">DEV RINGS</button>
        </Link>
        <AddWebhookInput userId={userId} />
        <SignOutButton />
      </nav>
    );
  }

  return null;
};
