import type { NextPage } from "next";
import Image from "next/image";
import { githubSignIn } from "../lib/firebase";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <button
        onClick={githubSignIn}
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
    </div>
  );
};

export default Home;
