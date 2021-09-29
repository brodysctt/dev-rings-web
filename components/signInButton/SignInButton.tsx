import Image from "next/image";
import { githubSignIn } from "components";

export const SignInButton = () => {
  return (
    <button
      onClick={() => githubSignIn()}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "8vh",
        width: "200px",
      }}
    >
      <Image src="/github.png" width="30px" height="30px" />
      Sign in with GitHub
    </button>
  );
};
